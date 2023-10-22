import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MachineInfo } from './machine.interface';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BlacklistedIp } from '../entities/backlisted-ip.entity';

@Injectable()
export class BuilderService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('build') private buildQueue: Queue,
    @InjectRepository(BlacklistedIp)
    private blacklistedIpRepository: Repository<BlacklistedIp>,
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

    await this.buildQueue.add('build-job', {
      machineData: info,
      rootDir: this.configService.get('rootDir'),
    });
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

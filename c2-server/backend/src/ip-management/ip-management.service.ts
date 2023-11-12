import { Injectable, Logger } from '@nestjs/common';
import { CreateIpManagementDto } from './dto/create-ip-management.dto';
import { UpdateIpManagementDto } from './dto/update-ip-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedIp } from './entities/ip-management.entity';

@Injectable()
export class IpManagementService {
  private readonly logger = new Logger(IpManagementService.name);
  constructor(
    @InjectRepository(BlacklistedIp)
    private IpManagementRepository: Repository<BlacklistedIp>,
  ) {}

  async create(
    createIpManagementDto: CreateIpManagementDto,
  ): Promise<BlacklistedIp> {
    const ipManagement = new BlacklistedIp(createIpManagementDto);
    return await this.IpManagementRepository.save(ipManagement);
  }

  async findAll() {
    return await this.IpManagementRepository.find();
  }

  async findOne(id: number) {
    return await this.IpManagementRepository.findOneBy({ id: id });
  }

  async update(id: number, updateIpManagementDto: UpdateIpManagementDto) {
    const ipManagement = await this.IpManagementRepository.findOneBy({
      id: id,
    });
    ipManagement.ip = updateIpManagementDto.ip;
    ipManagement.reason = updateIpManagementDto.reason;
    return await this.IpManagementRepository.save(ipManagement);
  }

  async remove(id: number) {
    return await this.IpManagementRepository.delete({ id: id });
  }

  async removeAll() {
    await this.IpManagementRepository.clear();
  }
}

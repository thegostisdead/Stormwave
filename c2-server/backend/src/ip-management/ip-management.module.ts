import { Module } from '@nestjs/common';
import { IpManagementService } from './ip-management.service';
import { IpManagementController } from './ip-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedIp } from './entities/ip-management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedIp])],
  controllers: [IpManagementController],
  providers: [IpManagementService],
})
export class IpManagementModule {}

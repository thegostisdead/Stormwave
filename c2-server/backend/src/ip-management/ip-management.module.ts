import { Module } from '@nestjs/common';
import { IpManagementService } from './ip-management.service';
import { IpManagementController } from './ip-management.controller';

@Module({
  controllers: [IpManagementController],
  providers: [IpManagementService],
})
export class IpManagementModule {}

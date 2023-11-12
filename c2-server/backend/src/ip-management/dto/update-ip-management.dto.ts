import { PartialType } from '@nestjs/swagger';
import { CreateIpManagementDto } from './create-ip-management.dto';

export class UpdateIpManagementDto extends PartialType(CreateIpManagementDto) {}

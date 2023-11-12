import { IsIP, IsNotEmpty, IsString } from 'class-validator';

export class CreateIpManagementDto {
  @IsIP()
  @IsNotEmpty()
  ip: string;

  @IsString()
  reason: string;
}

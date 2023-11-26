import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBotDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  hostname: string;
}

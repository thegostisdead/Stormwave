import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommandDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsBoolean()
  executed: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  botId: number;
}

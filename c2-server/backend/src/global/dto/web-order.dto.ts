import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

// TODO - automate this
const commands = ['GET_COMMAND', 'ACK_COMMAND', 'ANNOUNCE'];

export class WebOrderDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(commands)
  command: 'GET_COMMAND' | 'ACK_COMMAND' | 'ANNOUNCE';

  data?: string;
}

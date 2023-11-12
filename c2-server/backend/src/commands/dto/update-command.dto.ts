import { PartialType } from '@nestjs/swagger';
import { CreateCommandDto } from './create-command.dto';

export class UpdateCommandDto extends PartialType(CreateCommandDto) {}

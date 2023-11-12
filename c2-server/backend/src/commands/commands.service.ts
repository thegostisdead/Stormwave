import { Injectable, Logger } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor() {}
  create(createCommandDto: CreateCommandDto) {
    return 'This action adds a new command';
  }

  findAll() {
    return `This action returns all commands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} command`;
  }

  update(id: number, updateCommandDto: UpdateCommandDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }
}

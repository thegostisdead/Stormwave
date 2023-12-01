import { Injectable, Logger } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './entities/command.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
  ) {}
  async create(createCommandDto: CreateCommandDto) {
    return this.commandRepository.save(createCommandDto);
  }

  async findAll() {
    return this.commandRepository.find();
  }

  async findOne(id: number) {
    return this.commandRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCommandDto: UpdateCommandDto) {
    return this.commandRepository.update(id, updateCommandDto);
  }

  async remove(id: number) {
    return this.commandRepository.delete(id);
  }

  async removeAll() {
    return this.commandRepository.clear();
  }

  async acknowledgeCommand(bot: string, data: any) {
    this.logger.log(`acknowledgeCommand ${bot} ${data}`);

    // return this.commandRepository.update({ bot: bot }, { data: data });
  }
}

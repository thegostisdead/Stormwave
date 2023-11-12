import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';

@Module({
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}

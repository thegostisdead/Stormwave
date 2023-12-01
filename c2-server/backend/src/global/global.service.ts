import { Injectable, Logger } from '@nestjs/common';
import { BotsService } from '../bots/bots.service';
import { CommandsService } from '../commands/commands.service';

@Injectable()
export class GlobalService {
  private readonly logger = new Logger(GlobalService.name);
  constructor(
    private readonly botsService: BotsService,
    private readonly commandsService: CommandsService,
  ) {}

  async announce(bot: string, ip: string, data: any) {
    // check if the bot already exists
    // if the bot already exists, send a command to the bot to update its data from itself
    // if the bot does not exist, create it
  }

  async getCommand(botUuid: string) {
    this.logger.log(`getCommand ${botUuid}`);
    return this.botsService.getCommandByUuid(botUuid);
  }

  async acknowledgeCommand(bot: string, data: any) {
    this.logger.log(`acknowledgeCommand ${bot} ${data}`);

    return this.commandsService.acknowledgeCommand(bot, data);
  }
}

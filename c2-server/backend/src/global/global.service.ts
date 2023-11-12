import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GlobalService {
  private readonly logger = new Logger(GlobalService.name);
  constructor() {}

  async getCommand(bot: string) {
    this.logger.log(`getCommand ${bot}`);
    return { command: 'NOOP' };
  }

  async acknowledgeCommand(bot: string, data: any) {
    this.logger.log(`acknowledgeCommand ${bot} ${data}`);
    return { command: 'NOOP' };
  }
}

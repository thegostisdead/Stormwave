import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { WebOrderDto } from './dto/web-order.dto';
import { GlobalService } from './global.service';
import { MachinesService } from '../machines/machines.service';

@Controller('global')
export class GlobalController {
  constructor(
    private readonly globalService: GlobalService,
    private readonly machinesService: MachinesService,
  ) {}

  @Post('/')
  async event(@Body() body: WebOrderDto, @Req() req: Request) {
    // TODO check if the ip is blacklisted

    try {
      // check if the machine is in the database
      await this.machinesService.findByUuid(body.uuid);
    } catch (e) {
      console.log(`Unknown machine ${body.uuid} from ${req.ip}`);
      return {};
    }

    switch (body.command) {
      case 'GET_COMMAND':
        return await this.globalService.getCommand(body.uuid);

      case 'ACK_COMMAND':
        return await this.globalService.acknowledgeCommand(
          body.uuid,
          body.data,
        );

      default:
        console.log(`Unknown command received from ${req.ip}`);
    }
  }
}

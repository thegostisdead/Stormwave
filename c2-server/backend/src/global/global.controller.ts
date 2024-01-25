import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { WebOrderDto } from './dto/web-order.dto';
import { GlobalService } from './global.service';
import { BotsService } from '../bots/bots.service';
import { IPFILTER_TOKEN, IpFilterService } from 'nestjs-ip-filter';

@Controller('global')
export class GlobalController {
  constructor(
    private readonly globalService: GlobalService,
    @Inject(IPFILTER_TOKEN)
    private readonly ipFilterService: IpFilterService,
  ) {}

  @Post('/')
  async event(@Body() body: any, @Req() req: Request) {
    switch (body.command) {
      case 'ANNOUNCE':
        return await this.globalService.announce(body.uuid, req.ip, body.data);

      case 'GET_COMMAND':
        return await this.globalService.getCommand(body.uuid);

      case 'ACK_COMMAND':
        return await this.globalService.acknowledgeCommand(
          body.uuid,
          body.data,
        );

      default:
        console.log(`Unknown command received from ${req.ip}`);
        break;
    }
  }
}

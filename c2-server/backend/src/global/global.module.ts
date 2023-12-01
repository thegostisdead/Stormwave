import { Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';
import { BotsModule } from '../bots/bots.module';
import { IpFilter } from 'nestjs-ip-filter';

@Module({
  imports: [BotsModule, IpFilter.register({})],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}

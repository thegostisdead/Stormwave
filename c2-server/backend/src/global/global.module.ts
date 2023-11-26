import { Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';
import { BotsModule } from '../bots/bots.module';

@Module({
  imports: [BotsModule],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}

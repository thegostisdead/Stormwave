import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';

@Module({
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule {}

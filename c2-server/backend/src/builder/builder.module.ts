import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import {BullModule} from "@nestjs/bull";

@Module({
  imports: [
    BullModule.registerQueueAsync(
        {
          name: 'build',
        },
    ),
  ],
  providers: [BuilderService],
})
export class BuilderModule {}

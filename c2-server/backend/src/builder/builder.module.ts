import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlacklistedIp } from '../entities/backlisted-ip.entity';
import { BuilderController } from './builder.controller';
import { BullModule } from '@nestjs/bull';
import { BuildConsumer } from './build-consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlacklistedIp]),
    BullModule.registerQueue({
      name: 'build',
    }),
  ],
  controllers: [BuilderController],
  providers: [BuilderService, BuildConsumer],
})
export class BuilderModule {}

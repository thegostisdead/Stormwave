import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlacklistedIp } from '../entities/backlisted-ip.entity';
import { BuilderController } from './builder.controller';
import { BullModule } from '@nestjs/bull';
import { BuildConsumer } from './build-consumer';
import { UrlRegistry } from '../entities/url-registry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlacklistedIp, UrlRegistry]),
    BullModule.registerQueue({
      name: 'build',
    }),
  ],
  controllers: [BuilderController],
  providers: [BuilderService, BuildConsumer],
})
export class BuilderModule {}

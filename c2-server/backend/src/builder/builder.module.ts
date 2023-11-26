import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuilderController } from './builder.controller';
import { BullModule } from '@nestjs/bull';
import { BuildConsumer } from './build-consumer';
import { UrlRegistry } from '../entities/url-registry.entity';
import { BlacklistedIp } from '../ip-management/entities/ip-management.entity';

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

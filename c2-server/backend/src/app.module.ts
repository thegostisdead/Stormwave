import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestMinioModule } from 'nestjs-minio';
import { ConfigModule } from '@nestjs/config';

import { BuilderModule } from './builder/builder.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { CommandsModule } from './commands/commands.module';
import { BotsModule } from './bots/bots.module';
import { IpManagementModule } from './ip-management/ip-management.module';

import * as process from 'process';

import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRoot({
      redis: {
        host: '217.76.52.124',
        port: 6379,
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      },
    }),
    MongooseModule.forRoot(
      'mongodb://root:to99J98oa1xLQCF0@217.76.52.124:27017',
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NestMinioModule.register({
      isGlobal: true,
      endPoint: process.env.BUCKET_ENDPOINT,
      useSSL: false,
      port: parseInt(process.env.BUCKET_PORT),
      accessKey: process.env.BUCKET_ACCESS_KEY,
      secretKey: process.env.BUCKET_SECRET_KEY,
    }),
    BuilderModule,
    AuthModule,
    UsersModule,
    GlobalModule,
    BotsModule,
    CommandsModule,
    IpManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

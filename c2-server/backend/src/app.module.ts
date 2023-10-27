import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestMinioModule } from 'nestjs-minio';
import { ConfigModule } from '@nestjs/config';

import { BuilderModule } from './builder/builder.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import * as process from 'process';

import configuration from './config/configuration';

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
    MachinesModule,
    BuilderModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

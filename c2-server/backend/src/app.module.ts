import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestMinioModule } from 'nestjs-minio';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { BuilderController } from './builder/builder.controller';
import { BuilderModule } from './builder/builder.module';
import {BullModule} from "@nestjs/bull";
@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NestMinioModule.registerAsync({
      inject: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          endPoint: configService.get<string>('BUCKET_ENDPOINT'),
          useSSL: false,
          port: configService.get<number>('BUCKET_PORT'),
          accessKey: configService.get<string>('BUCKET_ACCESS_KEY'),
          secretKey: configService.get<string>('BUCKET_SECRET_KEY'),
        }),

    }),
    MachinesModule,
    BuilderModule,
  ],
  controllers: [AppController, BuilderController],
  providers: [AppService],
})
export class AppModule {}

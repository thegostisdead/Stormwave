import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { Bot } from './entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { BotMetadata, BotMetadataSchema } from './schemas/bot-metadata.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bot]),
    MongooseModule.forFeature([
      { name: BotMetadata.name, schema: BotMetadataSchema },
    ]),
  ],
  controllers: [BotsController],
  providers: [BotsService],
  exports: [BotsService],
})
export class BotsModule {}

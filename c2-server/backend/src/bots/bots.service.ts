import { Injectable, Logger } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot as BotEntity } from './entities/bot.entity';
import { Bot as Bot } from './interfaces/bot.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { BotMetadata } from './schemas/bot-metadata.schema';

@Injectable()
export class BotsService {
  private readonly logger = new Logger(BotsService.name);
  constructor(
    @InjectRepository(BotEntity)
    private botRepository: Repository<BotEntity>,
    @InjectModel(BotMetadata.name)
    private botMetaModel: Repository<BotMetadata>,
  ) {}

  async create(createBotDto: CreateBotDto) {
    const newBot = await this.botRepository.save(createBotDto);
    const botMeta = await this.botMetaModel.save({
      botId: newBot.id,
      deployedPayloads: [],
    });

    return {
      ...newBot,
      deployedPayloads: botMeta.deployedPayloads,
    };
  }

  async findAll(): Promise<Bot[]> {
    const bots = await this.botRepository.find();
    const botMetas = await this.botMetaModel.find();
    return bots.map((bot) => {
      const botMeta = botMetas.find((meta) => meta.botId === bot.id);
      return {
        ...bot,
        deployedPayloads: botMeta?.deployedPayloads || [],
      };
    });
  }

  async findOne(id: number) {
    const bot = await this.botRepository.findOne({ where: { id } });
    const botMeta = await this.botMetaModel.findOne({
      where: { botId: bot.id },
    });
    return {
      ...bot,
      deployedPayloads: botMeta?.deployedPayloads || [],
    };
  }

  async update(id: number, updateBotDto: UpdateBotDto) {
    return await this.botRepository.update(id, updateBotDto);
  }

  async remove(id: number) {
    try {
      await this.botRepository.delete(id);
      await this.botMetaModel.delete({ botId: id });
      return { message: 'Bot removed' };
    } catch (error) {
      this.logger.error(error);
      return { message: "Can't remove bot" };
    }
  }

  async removeAll() {
    await this.botRepository.clear();
    await this.botMetaModel.clear();
    return { message: 'All bots removed' };
  }
}

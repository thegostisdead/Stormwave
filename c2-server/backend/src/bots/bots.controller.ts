import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  async create(@Body() createBotDto: CreateBotDto) {
    return await this.botsService.create(createBotDto);
  }

  @Get()
  async findAll() {
    return await this.botsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.botsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBotDto: UpdateBotDto) {
    return await this.botsService.update(+id, updateBotDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.botsService.remove(+id);
  }
}

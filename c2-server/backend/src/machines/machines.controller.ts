import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { Command } from '../interfaces/Command';
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}
  @Post('/:id/command')
  addCommand(@Param('id') id: string, @Body() body: CreateCommandDto) {
    return this.machinesService.addCommand(id, body as Command);
  }

  @Get('/:id/command')
  getCommand(@Param('id') params: string): Command {
    return this.machinesService.getCommand(params);
  }

  @Post('/:id/command/ack')
  acknowledgeCommand(@Param('id') params: string) {
    return this.machinesService.acknowledgeCommand(params);
  }

  @Post('/:id/modules')
  updateModulesData(@Param('id') params: string) {
    return this.machinesService.updateModulesData(params);
  }

  @Post()
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  findAll() {
    return this.machinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(+id, updateMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machinesService.remove(+id);
  }
}

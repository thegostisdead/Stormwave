import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { MachineInfoDto } from './dto/machine-info.dto';
import { CreateBlacklistEntryDto } from './dto/create-blacklist-entry.dto';
import { MachineInfo } from './interfaces/machine.interface';

@Controller('builder')
export class BuilderController {
  constructor(private builderService: BuilderService) {}

  @Post('/build')
  build(@Body() machineInfo: MachineInfoDto) {
    const data = machineInfo as MachineInfo;
    return this.builderService.build(data);
  }

  @Get('/get-binary/:dropperId')
  @Post('/blacklist')
  addBlackListEntry(@Param('dropperId') dropperId: string) {
    const url = this.builderService.getBinaryFile(dropperId);
    return { url };
  }

  @Delete('/blacklist/:ip')
  deleteBlackListEntry(@Param('ip') ip: string) {
    return this.builderService.removeBlacklist(ip);
  }

  @Delete('/blacklist')
  clearBlackList() {
    return this.builderService.clearBlacklist();
  }
}

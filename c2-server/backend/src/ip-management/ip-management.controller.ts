import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpManagementService } from './ip-management.service';
import { CreateIpManagementDto } from './dto/create-ip-management.dto';
import { UpdateIpManagementDto } from './dto/update-ip-management.dto';

@Controller('ip-management')
export class IpManagementController {
  constructor(private readonly ipManagementService: IpManagementService) {}

  @Post()
  create(@Body() createIpManagementDto: CreateIpManagementDto) {
    return this.ipManagementService.create(createIpManagementDto);
  }

  @Get()
  findAll() {
    return this.ipManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpManagementDto: UpdateIpManagementDto) {
    return this.ipManagementService.update(+id, updateIpManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipManagementService.remove(+id);
  }
}

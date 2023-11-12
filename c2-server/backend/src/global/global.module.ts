import { Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';
import { MachinesModule } from '../machines/machines.module';

@Module({
  imports: [MachinesModule],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}

import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const machine = this.machinesRepository.create(createMachineDto);
    return await this.machinesRepository.save(machine);
  }

  async findAll(): Promise<Machine[]> {
    return await this.machinesRepository.find();
  }

  async findOne(id: number): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({ where: { id } });
    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }
    return machine;
  }

  async findByUuid(uuid: string): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({ where: { uuid } });

    if (!machine) {
      throw new NotFoundException(`Machine with UUID ${uuid} not found`);
    }

    return machine;
  }

  async update(
    id: number,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    const existingMachine = await this.findOne(id);
    const updatedMachine: DeepPartial<Machine> = {
      ...existingMachine,
      ...updateMachineDto,
    };
    return await this.machinesRepository.save(updatedMachine);
  }

  async remove(id: number): Promise<void> {
    const machine = await this.findOne(id);
    await this.machinesRepository.remove(machine);
  }
}

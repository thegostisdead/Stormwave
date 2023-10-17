import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Machine } from './machine.entity';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'boolean', default: false })
  executed: boolean;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Machine, (machine) => machine.commands)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;
}

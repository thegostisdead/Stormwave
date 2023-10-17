import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Command } from './command.entity';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  hostname: string;

  @OneToMany(() => Command, (command) => command.machine)
  commands: Command[];
}
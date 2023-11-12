import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bot } from '../../bots/entities/bot.entity';

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

  @ManyToOne(() => Bot, (bot) => bot.commands)
  @JoinColumn({ name: 'id' })
  bot: Bot;

  constructor(command: Partial<Command>) {
    Object.assign(this, command);
  }
}

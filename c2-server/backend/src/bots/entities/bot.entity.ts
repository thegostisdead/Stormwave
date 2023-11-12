import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Command } from '../../commands/entities/command.entity';

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  hostname: string;

  @OneToMany(() => Command, (command) => command.bot)
  commands: Command[];

  constructor(bot: Partial<Bot>) {
    Object.assign(this, bot);
  }
}

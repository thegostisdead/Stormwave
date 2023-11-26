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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  lastSeen: Date;

  @OneToMany(() => Command, (command) => command.bot)
  commands: Command[];

  @Column({ type: 'text', nullable: true })
  os: string;

  @Column({ type: 'text', nullable: true })
  arch: string;

  constructor(bot: Partial<Bot>) {
    Object.assign(this, bot);
  }
}

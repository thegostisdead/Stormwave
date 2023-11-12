import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from '../bots/entities/bot.entity';
import { Command } from '../commands/entities/command.entity';
import { BlacklistedIp } from '../ip-management/entities/ip-management.entity';

export const InMemoryTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Bot, Command, BlacklistedIp],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Bot, Command, BlacklistedIp]),
];

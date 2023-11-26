import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { InMemoryTestingModule } from '../test-utils/InMemoryTestingModule';
import { testSeedCommand } from '../test-utils/testCommand.seed';

import { BotsService } from '../bots/bots.service';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const inMemoryTestingModule = InMemoryTestingModule();

    const module: TestingModule = await Test.createTestingModule({
      imports: [...inMemoryTestingModule],
      providers: [CommandsService, BotsService],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
    await testSeedCommand(module.get<BotsService>(BotsService));
  });

  afterEach(async () => {
    await service.removeAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const created = await service.create({
      date: new Date(),
      executed: false,
      name: 'test',
      botId: 1,
    });

    const result = await service.findOne(created.id);

    expect(result).toEqual({
      id: created.id,
      date: created.date,
      executed: false,
      name: 'test',
      botId: created.botId,
    });
  });
  it('findAll', async () => {});
  it('findOne', async () => {});
  it('update', async () => {});
  it('remove', async () => {});
});

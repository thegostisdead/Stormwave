import { Test, TestingModule } from '@nestjs/testing';
import { IpManagementService } from './ip-management.service';
import { InMemoryTestingModule } from '../test-utils/InMemoryTestingModule';

describe('IpManagementService', () => {
  let service: IpManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...InMemoryTestingModule()],
      providers: [IpManagementService],
    }).compile();

    service = module.get<IpManagementService>(IpManagementService);
  });

  afterEach(async () => {
    await service.removeAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const data = {
      ip: '1.1.1.1',
      reason: 'Cloudflare',
    };

    const created = await service.create(data);

    const result = await service.findOne(created.id);

    expect(result).toEqual({
      id: created.id,
      ip: '1.1.1.1',
      reason: 'Cloudflare',
    });
  });

  it('findAll', async () => {
    const ips = [
      { ip: '8.8.8.8', reason: 'Google dns 1' },
      { ip: '8.4.4.8', reason: 'Google dns 2' },
    ];

    await Promise.all(ips.map(async (ip) => await service.create(ip)));

    const result = await service.findAll();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(ips[0]),
        expect.objectContaining(ips[1]),
      ]),
    );
  });

  it('findOne', async () => {
    const created = await service.create({
      ip: '208.67.222.222',
      reason: 'OpenDNS',
    });

    const result = await service.findOne(created.id);

    expect(result).toEqual({
      id: created.id,
      ip: '208.67.222.222',
      reason: 'OpenDNS',
    });
  });

  it('update', async () => {
    const created = await service.create({
      ip: '208.67.222.222',
      reason: 'OpenDNS',
    });

    await service.update(created.id, {
      ip: '208.67.220.220',
      reason: 'OpenDNS 2',
    });

    const result = await service.findOne(created.id);

    expect(result).toEqual({
      id: created.id,
      ip: '208.67.220.220',
      reason: 'OpenDNS 2',
    });
  });

  it('remove', async () => {
    const created = await service.create({
      ip: '5.5.5.5',
      reason: 'Cloudflare',
    });

    await service.remove(created.id);

    const result = await service.findOne(created.id);

    expect(result).toBeNull();
  });
});

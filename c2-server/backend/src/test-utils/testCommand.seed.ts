import { BotsService } from '../bots/bots.service';

export const testSeedCommand = async (botsService: BotsService) => {
  await botsService.create({
    uuid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    hostname: 'test-hostname',
  });
};

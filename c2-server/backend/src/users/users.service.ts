import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  async findOne(username: string): Promise<User | undefined> {
    const users = JSON.parse(
      readFileSync(this.configService.get<string>('users'), 'utf-8'),
    );

    return users.find((user) => user.username === username);
  }
}

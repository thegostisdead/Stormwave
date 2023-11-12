import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export interface User {
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    image: string;
    password: string;
  };
  expires: Date; // This is the expiry of the session, not any of the tokens within the session
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private configService: ConfigService) {}

  async findOne(username: string): Promise<User | undefined> {
    const users = JSON.parse(
      readFileSync(this.configService.get<string>('users'), 'utf-8'),
    );

    const user = users.find((user) => user.username === username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const patchedUser = {} as User;

    patchedUser.user = user;
    patchedUser.expires = new Date();
    patchedUser.expires.setHours(patchedUser.expires.getHours() + 1);
    return patchedUser;
  }
}

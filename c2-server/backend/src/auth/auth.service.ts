import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const userRow = await this.usersService.findOne(username);

    if (userRow.user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: userRow.user.id,
      username: userRow.user.username,
    };
    userRow.user['access_token'] = await this.jwtService.signAsync(payload);
    return userRow;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private users: UsersService,
  ) {}

  async login(data: LoginDto): Promise<string> {
    const { username, password } = data;

    const user = await this.db.user.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException(
        'a user with this username does not exist',
      );
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('invalid password');
    }

    return this.jwt.sign({ username });
  }

  async register(data: RegisterDto): Promise<string> {
    const user = await this.users.create(data);
    return this.jwt.sign({ username: user.username });
  }
}

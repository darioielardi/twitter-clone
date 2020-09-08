import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(data: LoginDto): Promise<string> {
    const { username, password } = data;

    const user = await this.db.user.findOne({
      where: { username },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('invalid password');
    }

    return this.jwt.sign({ username });
  }

  async register(data: RegisterDto): Promise<string> {
    const existing = await this.db.user.findOne({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('a user with this username already exists');
    }

    const user = await this.db.user.create({ data });
    return this.jwt.sign({ username: user.username });
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserCreateInput } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findOne(username: string): Promise<User> {
    const user = await this.db.user.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;

    return user;
  }

  async create(data: UserCreateInput): Promise<User> {
    const existing = await this.db.user.findOne({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('a user with this username already exists');
    }

    // the second argument ( 10 ) is just a "cost factor".
    // the higher the cost factor, the more difficult is brute-forcing
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }
}

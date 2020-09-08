import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.db.user.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.db.user.findOne({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('a user with this username already exists');
    }

    return this.db.user.create({ data });
  }
}

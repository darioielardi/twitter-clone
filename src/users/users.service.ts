import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

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
}

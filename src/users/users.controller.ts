import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.service.findOne(username);
  }
}

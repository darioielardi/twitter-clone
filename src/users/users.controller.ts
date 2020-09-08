import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

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

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }
}

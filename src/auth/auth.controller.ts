import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import AuthUser from '../common/decorators/auth-user.decorator';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<{ token: string }> {
    return { token: await this.service.login(data) };
  }

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<{ token: string }> {
    return { token: await this.service.register(data) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@AuthUser() user: User): User {
    return user;
  }
}

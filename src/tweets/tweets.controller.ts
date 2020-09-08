import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Tweet, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import AuthUser from '../common/decorators/auth-user.decorator';
import { PostTweetDto } from './tweets.dto';
import { TweetsService } from './tweets.service';

@UseGuards(JwtAuthGuard)
@Controller('tweets')
export class TweetsController {
  constructor(private service: TweetsService) {}

  @Get()
  find(@Query('username') username?: string): Promise<Tweet[]> {
    return this.service.find(username);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tweet> {
    return this.service.findOne(id);
  }

  @Post()
  post(@Body() data: PostTweetDto, @AuthUser() user: User): Promise<Tweet> {
    return this.service.post(user.username, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @AuthUser() user: User): Promise<void> {
    return this.service.delete(user.username, id);
  }
}

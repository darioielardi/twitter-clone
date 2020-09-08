import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  providers: [TweetsService, PrismaService],
  controllers: [TweetsController],
})
export class TweetsModule {}

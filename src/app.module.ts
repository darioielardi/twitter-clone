import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [UsersModule, AuthModule, TweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

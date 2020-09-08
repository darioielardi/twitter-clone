import { IsString, Length } from 'class-validator';

export class PostTweetDto {
  @IsString()
  @Length(1, 140)
  content: string;
}

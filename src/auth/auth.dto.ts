import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;
}

export class RegisterDto {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsString()
  @Length(1, 50)
  displayName: string;
}

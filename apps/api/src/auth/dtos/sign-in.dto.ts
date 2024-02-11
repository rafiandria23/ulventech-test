import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class AdminSignInDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

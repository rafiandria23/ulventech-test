import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class AdminSignUpDto {
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

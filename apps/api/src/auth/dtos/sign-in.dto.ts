import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class UserSignInDto {
  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class AdminSignInDto {
  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

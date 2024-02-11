import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class AdminSignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly last_name?: string;

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

export class UserSignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly last_name?: string;

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

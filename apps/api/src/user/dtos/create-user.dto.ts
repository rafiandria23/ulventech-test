import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  readonly last_name?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateAdminDto {
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
}

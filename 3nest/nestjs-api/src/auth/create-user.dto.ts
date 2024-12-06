import { IsString, IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator'
import { UserRoles } from './roles'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

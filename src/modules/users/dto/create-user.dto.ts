import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { UserRoleEnum } from '../schema/user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsMongoId()
  facility: string;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: string;

  @IsOptional()
  @IsBoolean()
  isApproved: boolean;
}

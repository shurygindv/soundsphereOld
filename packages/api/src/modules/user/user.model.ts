import {RoleType} from '../../app.types';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUUID,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

export class UserModel {
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  public readonly firstName: string;

  @IsEnum(RoleType)
  @IsOptional()
  public readonly roleId: RoleType;

  @MinLength(2)
  @IsNotEmpty()
  @IsOptional()
  public readonly lastName: string;

  @IsUUID()
  @IsOptional()
  public readonly imageId: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
}

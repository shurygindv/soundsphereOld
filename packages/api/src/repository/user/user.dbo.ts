import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsEmail,
  IsUUID,
  IsOptional,
} from 'class-validator';

import {RoleType} from '../../types';

export class UserDBO {
  @IsUUID()
  Id: string;

  @IsEnum(RoleType)
  RoleId: RoleType;

  @MaxLength(50)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @MaxLength(50)
  @MinLength(2)
  @IsOptional()
  LastName: string;

  @IsEmail()
  @MaxLength(50)
  Email: string;
}

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
import {RoleType} from '../../app.types';


export class UserDBO {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  public Id: string;

  @IsEnum(RoleType)
  public RoleId: RoleType;

  @IsUUID()
  @IsOptional()
  public ImageId: string;

  @MaxLength(50)
  @MinLength(5)
  @IsNotEmpty()
  public Password: string;

  @MaxLength(50)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  public FirstName: string;

  @MaxLength(50)
  @MinLength(2)
  @IsOptional()
  public LastName: string;

  @IsEmail()
  @MaxLength(50)
  public Email: string;
}

import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  public readonly firstName: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsOptional()
  public readonly lastName: string;

  @IsUUID()
  @IsOptional()
  public imageId: string;

  @MinLength(5)
  @IsNotEmpty()
  public readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
}

import {IsNotEmpty, IsEmail, MinLength} from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(5)
  @IsNotEmpty()
  public readonly password: string;
}

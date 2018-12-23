import {IsNotEmpty, MaxLength, MinLength, IsOptional} from 'class-validator';

export class CreateImageDTO {
  @MinLength(2)
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Data: Buffer;

  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  MimeType: string;
}

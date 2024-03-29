import {IsNotEmpty, MaxLength, MinLength, IsOptional} from 'class-validator';

export class CreateImageDTO {
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: Buffer;

  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  mimeType: string;
}

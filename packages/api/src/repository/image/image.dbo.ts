import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class ImageDBO {
  @IsUUID()
  @IsNotEmpty()
  Id: number;

  @MaxLength(100)
  @IsString()
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

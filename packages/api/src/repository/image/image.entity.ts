import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class ImageEntity {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  Id: string;

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

  constructor(name: string, data: Buffer, mimeType?: string) {
    this.Name = name;
    this.Data = data;
    this.MimeType = mimeType;
  }
}

import {IsNotEmpty, MaxLength, MinLength, IsOptional} from 'class-validator';

export class ImageModel {
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: Buffer;

  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  mimeType: string;

  constructor(name: string, data: Buffer, mimeType?: string) {
    this.name = name;
    this.data = data;
    this.mimeType = mimeType;
  }
}

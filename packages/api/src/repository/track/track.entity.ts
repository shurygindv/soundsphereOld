import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TrackEntity {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  Id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  AlbumId: string;

  @MaxLength(100)
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Data: Buffer;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  Lyrics: string;

  constructor(
    name: string,
    data: Buffer,
    lyrics: string,
    albumId?: string,
    id?: string,
  ) {
    this.Name = name;
    this.Data = data;

    this.Id = id;
    this.Lyrics = lyrics;
    this.AlbumId = albumId;
  }
}

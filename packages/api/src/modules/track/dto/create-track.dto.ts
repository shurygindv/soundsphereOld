import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

// TODO: TrackDTO with Validation;

export class CreateTrackDTO {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  data: Buffer;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @MaxLength(300)
  @IsString()
  @IsOptional()
  lyrics: string;
}

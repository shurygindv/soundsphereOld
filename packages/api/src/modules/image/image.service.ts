import {Injectable, ValidationPipe, UsePipes} from '@nestjs/common';

import {ImageRepository} from 'app/repository/image/image.repository';
import {ImageEntity} from 'app/repository/image/image.entity';
import {CreateImageDTO} from './dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  @UsePipes(new ValidationPipe())
  async upload(imageDto: CreateImageDTO) {
    const imageEntity = new ImageEntity(
      imageDto.Name,
      imageDto.Data,
      imageDto.MimeType,
    );

    return await this.imageRepository.create(imageEntity);
  }

  async findOne(id: number) {
    return await this.imageRepository.findOne(id);
  }
}

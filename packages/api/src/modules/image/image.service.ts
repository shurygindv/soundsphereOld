import {Injectable, ValidationPipe, UsePipes} from '@nestjs/common';

import {ImageRepository} from 'app/repository/image/image.repository';
import {ImageEntity} from 'app/repository/image/image.entity';
import {CreateImageDTO} from './dto/create-image.dto';
import {BaseService} from '../../shared/';
import {ImageModel} from './image.model';

@Injectable()
export class ImageService extends BaseService {
  constructor(private readonly imageRepository: ImageRepository) {
    super();
  }

  @UsePipes(new ValidationPipe())
  async upload(imageDto: CreateImageDTO) {
    const imageEntity = new ImageEntity(
      imageDto.name,
      imageDto.data,
      imageDto.mimeType,
    );

    return await this.imageRepository.create(imageEntity);
  }

  async findOne(id: number) {
    const entity = await this.imageRepository.findOne(id);

    const model = new ImageModel(entity.Name, entity.Data, entity.MimeType);

    return this.validate(model);
  }
}

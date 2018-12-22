import {Injectable} from '@nestjs/common';

import {ICrud} from './../../types';
import {ImageDBO} from './image.dbo';

@Injectable()
export class ImageRepository implements ICrud<ImageDBO> {
  create(entity: ImageDBO): Promise<number> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<ImageDBO> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ImageDBO[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: ImageDBO): Promise<number> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

import {Injectable} from '@nestjs/common';

import {generateId, SqlCommander} from 'app/plugins';
import {ImageEntity} from './image.entity';
import {ICrud} from './../repository.types';
import {BaseRepository} from '../../shared/';

const PROCEDURE_NAME = {
  CREATE: 'Image_Create',
  UPDATE: 'Image_Update',
  FIND_ALL: 'Image_FindAll',
  FIND_BY_ID: 'Image_FindById',
};

@Injectable()
export class ImageRepository extends BaseRepository
  implements ICrud<ImageEntity> {
  async create(entity: ImageEntity): Promise<boolean> {
    const commander = SqlCommander.create<ImageEntity>(this.db);

    commander.addInput('Id', generateId());
    commander.addInput('Data', entity.Data);
    commander.addInput('Name', entity.Name);

    if (entity.MimeType) {
      commander.addInput('MimeType', entity.MimeType);
    }

    await commander.execute(PROCEDURE_NAME.CREATE);

    return true;
  }

  async findOne(id: string): Promise<ImageEntity> {
    const commander = SqlCommander.create<ImageEntity>(this.db);

    commander.addInput('ImageId', id);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_ID);

    return this.validate(ImageEntity, result.singleValue);
  }

  findAll(): Promise<ImageEntity[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: ImageEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

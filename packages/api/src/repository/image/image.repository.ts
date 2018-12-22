import {Injectable} from '@nestjs/common';

import {ImageDBO} from './image.dbo';
import {ICrud} from './../repository.types';
import {
  generateId,

  SqlCommander,
  sqlTypes,
} from 'app/plugins';
import {BaseRepository} from '../../shared/';

const PROCEDURE_NAME = {
  CREATE: 'Image_Create',
  UPDATE: 'Image_Update',
  FIND_ALL: 'Image_FindAll',
  FIND_BY_ID: 'Image_FindById',
};

@Injectable()
export class ImageRepository extends BaseRepository
  implements ICrud<ImageDBO> {
  async create(entity: ImageDBO): Promise<boolean> {
    const commander = SqlCommander.create<ImageDBO, {ImageId: number}>(this.db);

    commander.addInput('Id', generateId());
    commander.addInput('Data', entity.Data);
    commander.addInput('Name', entity.Name);

    if (entity.MimeType) {
      commander.addInput('MimeType', entity.MimeType);
    }

    commander.addOutput('ImageId', sqlTypes.bigInt);

    const result = await commander.execute(PROCEDURE_NAME.CREATE);

    return result.output.ImageId;
  }

  async findOne(id: number): Promise<ImageDBO> {
    const commander = SqlCommander.create<ImageDBO>(this.db);

    commander.addInput('Id', id);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_ID);

    return this.validate(ImageDBO, result.singleValue);
  }

  findAll(): Promise<ImageDBO[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: ImageDBO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

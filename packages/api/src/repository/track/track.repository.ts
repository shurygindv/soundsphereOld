import {Injectable} from '@nestjs/common';

import {generateId, SqlCommander} from 'app/plugins';
import {BaseRepository} from '../../shared';
import {ICrud} from '../repository.types';
import {TrackEntity} from './track.entity';

const PROCEDURE_NAME = {
  CREATE: 'Track_Create',
  UPDATE: 'Track_Update',
  FIND_ALL: 'Track_FindAll',
  FIND_BY_ID: 'Track_FindById',
};

@Injectable()
export class TrackRepository extends BaseRepository
  implements ICrud<TrackEntity> {
  async create(entity: TrackEntity): Promise<boolean> {
    const commander = SqlCommander.create<TrackEntity>(this.db);

    if (entity.AlbumId) {
      commander.addInput('AlbumId', entity.AlbumId);
    }

    if (entity.Lyrics) {
      commander.addInput('Lyrics', entity.Lyrics);
    }

    commander.addInput('Id', generateId());
    commander.addInput('Name', entity.Name);
    commander.addInput('Data', entity.Data);

    await commander.execute(PROCEDURE_NAME.CREATE);

    return true;
  }

  async findOne(id: string): Promise<TrackEntity> {
    const commander = SqlCommander.create<TrackEntity>(this.db);

    commander.addInput('TrackId', id);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_ID);

    return await this.validate(TrackEntity, result.singleValue);
  }

  async findAll(): Promise<TrackEntity[]> {
    const commander = SqlCommander.create<TrackEntity[]>(this.db);

    const result = await commander.execute(PROCEDURE_NAME.FIND_ALL);

    return await this.validate(TrackEntity, result.values);
  }

  update(entity: TrackEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

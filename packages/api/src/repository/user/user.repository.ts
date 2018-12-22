import {Injectable} from '@nestjs/common';

import {UserDBO} from './user.dbo';
import {ICrud} from './../repository.types';

@Injectable()
export class UserRepository implements ICrud<UserDBO> {
  create(entity: UserDBO): Promise<number> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<UserDBO> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserDBO[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: UserDBO): Promise<number> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

import {Injectable} from '@nestjs/common';

import {UserDBO} from './user.dbo';
import {BaseRepository} from 'app/shared/';
import {
  generateId,
  Crypto,
  SqlCommander,
  sqlTypes,
} from 'app/plugins';
import {ICrud} from 'app/repository/repository.types';


const PROCEDURE_NAME = {
  CREATE: 'User_Create',
  UPDATE: 'User_Update',
  FIND_ALL: 'User_FindAll',
  FIND_BY_ID: 'User_FindById',
  FIND_BY_EMAIL: 'User_FindByEmail',
};

@Injectable()
export class UserRepository extends BaseRepository
  implements ICrud<UserDBO> {
  async create(entity: UserDBO): Promise<boolean> {
    const commander = SqlCommander.create<UserDBO, {UserId: number}>(this.db);

    if (entity.ImageId) {
      commander.addInput('ImageId', entity.ImageId);
    }

    if (entity.LastName) {
      commander.addInput('LastName', entity.LastName);
    }

    commander.addInput('Id', generateId());
    commander.addInput('Password', Crypto.hash(entity.Password));
    commander.addInput('RoleId', entity.RoleId);
    commander.addInput('Email', entity.Email);
    commander.addInput('FirstName', entity.FirstName);

    commander.addOutput('UserId', sqlTypes.bigInt);

    const result = await commander.execute(PROCEDURE_NAME.CREATE);

    return result.output.UserId;
  }

  async findOne(id: number): Promise<UserDBO> {
    const commander = SqlCommander.create<UserDBO>(this.db);

    commander.addInput('Id', id);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_ID);

    return await this.validate(UserDBO, result.singleValue);
  }

  public async findOneByEmail(email: string): Promise<UserDBO> {
    const commander = SqlCommander.create<UserDBO>(this.db);

    commander.addInput('Email', email);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_EMAIL);

    return await this.validate(UserDBO, result.singleValue);
  }

  async findAll(): Promise<UserDBO[]> {
    const commander = SqlCommander.create<UserDBO[]>(this.db);

    const result = await commander.execute(PROCEDURE_NAME.FIND_ALL);

    return await this.validate(UserDBO, result.values);
  }

  update(entity: UserDBO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

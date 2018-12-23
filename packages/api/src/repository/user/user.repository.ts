import {Injectable} from '@nestjs/common';

import {UserEntity} from './user.entity';
import {BaseRepository} from 'app/shared/';
import {generateId, Crypto, SqlCommander, sqlTypes} from 'app/plugins';
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
  implements ICrud<UserEntity> {
  async create(entity: UserEntity): Promise<boolean> {
    const commander = SqlCommander.create<UserEntity>(this.db);

    if (entity.ImageId) {
      commander.addInput('ImageId', entity.ImageId);
    }

    if (entity.LastName) {
      commander.addInput('LastName', entity.LastName);
    }

    const passwordHash = await Crypto.hash(entity.Password);

    commander.addInput('Id', generateId());
    commander.addInput('Password', passwordHash);
    commander.addInput('RoleId', entity.RoleId);
    commander.addInput('Email', entity.Email);
    commander.addInput('FirstName', entity.FirstName);

    await commander.execute(PROCEDURE_NAME.CREATE);

    return true;
  }

  async findOne(id: number): Promise<UserEntity> {
    const commander = SqlCommander.create<UserEntity>(this.db);

    commander.addInput('Id', id);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_ID);

    return await this.validate(UserEntity, result.singleValue);
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const commander = SqlCommander.create<UserEntity>(this.db);

    commander.addInput('Email', email);

    const result = await commander.execute(PROCEDURE_NAME.FIND_BY_EMAIL);

    return await this.validate(UserEntity, result.singleValue);
  }

  async findAll(): Promise<UserEntity[]> {
    const commander = SqlCommander.create<UserEntity[]>(this.db);

    const result = await commander.execute(PROCEDURE_NAME.FIND_ALL);

    return await this.validate(UserEntity, result.values);
  }

  update(entity: UserEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

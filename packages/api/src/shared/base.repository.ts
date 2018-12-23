import {Injectable, BadRequestException} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate as validator} from 'class-validator';

import {DatabaseProvider} from '../core/database/database.provider';

import {Class} from 'app/fixtures/types';

@Injectable()
export default class BaseRepository {
  constructor(protected readonly db: DatabaseProvider) {}

  async validate<T, V extends T[]>(classType: Class<T>, data: V): Promise<T[]>;
  async validate<T, V>(classType: Class<T>, data: V): Promise<T>;
  async validate<T, V>(classType: Class<T>, data: V | V[]): Promise<T> {
    const validatable = plainToClass(classType, data);

    const errors = await validator(validatable);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return validatable;
  }
}

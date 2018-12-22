import {Injectable, BadRequestException} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate as validator} from 'class-validator';

import {DatabaseProvider} from '../core/database/database.provider';
import {MapperService} from '../core/mapper/mapper.service';

import {Class} from 'app/fixtures/types';


@Injectable()
export default class BaseRepository {
  protected mapper: AutoMapperJs.AutoMapper;

  constructor(
    protected readonly db: DatabaseProvider,
    private readonly mapperService: MapperService,
  ) {
    this.mapper = mapperService.mapper;
  }

  async validate<T, V extends Array<T>>(classType: Class<T>, data: V): Promise<T[]>;
  async validate<T, V>(classType: Class<T>, data: V): Promise<T>;
  async validate<T, V>(classType: Class<T>, data: V | V[]): Promise<T> {
    let validatable = plainToClass(classType, data);

    const errors = await validator(validatable);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return validatable;
  }
}

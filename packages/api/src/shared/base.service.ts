import {Injectable, BadRequestException} from '@nestjs/common';
import {validate as validator} from 'class-validator';

@Injectable()
export default class BaseService {
  async validate<T>(object: T): Promise<T> {
    const errors = await validator(object);

    if (errors.length > 0) {
      throw new BadRequestException('Service validation failed');
    }

    return object;
  }
}

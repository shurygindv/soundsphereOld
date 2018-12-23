import {
  Injectable,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import * as R from 'ramda';

import {UserRepository} from 'app/repository/user/user.repository';
import {UserEntity} from 'app/repository/user/user.entity';
import {CreateUserDTO} from './dto/create-user.dto';
import {BaseService} from '../../shared/';
import {UserModel} from './user.model';
@Injectable()
export class UserService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  @UsePipes(new ValidationPipe())
  async create(userDto: CreateUserDTO): Promise<boolean> {
    const existing = await this.userRepository.findOneByEmail(userDto.email);

    if (!R.isNil(existing)) {
      throw new BadRequestException('Such user already exists');
    }

    const userEntity = new UserEntity(
      userDto.firstName,
      userDto.lastName,
      userDto.email,
      userDto.password,
      userDto.imageId,
    );

    return await this.userRepository.create(userEntity);
  }

  async findOne(id: number) {
    const entity = await this.userRepository.findOne(id);
    const model = new UserModel(
      entity.ImageId,
      entity.RoleId,
      entity.FirstName,
      entity.LastName,
      entity.Email,
    );

    return this.validate(model);
  }

  async findOneByEmail(email: string) {
    const entity = await this.userRepository.findOneByEmail(email);
    const model = new UserModel(
      entity.ImageId,
      entity.RoleId,
      entity.FirstName,
      entity.LastName,
      entity.Email,
    );

    return this.validate(model);
  }
}

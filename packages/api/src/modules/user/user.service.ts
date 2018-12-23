import {Injectable, UsePipes, ValidationPipe} from '@nestjs/common';

import {UserRepository} from 'app/repository/user/user.repository';
import {UserEntity} from 'app/repository/user/user.entity';
import {CreateUserDTO} from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @UsePipes(new ValidationPipe())
  async create(userDto: CreateUserDTO) {
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
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}

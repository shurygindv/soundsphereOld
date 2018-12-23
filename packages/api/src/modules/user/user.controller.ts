import {
  Get,
  Controller,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Body,
  Param,
} from '@nestjs/common';

import {UserService} from './user.service';
import {CreateUserDTO} from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async create(@Body('user') userDto: CreateUserDTO) {
    return await this.userService.create(userDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(Number(id));
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findOneByEmail(email);
  }
}

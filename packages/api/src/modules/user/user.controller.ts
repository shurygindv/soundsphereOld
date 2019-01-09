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
import {LoginUserDTO} from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async create(@Body('user') userDto: CreateUserDTO) {
    return await this.userService.create(userDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async login(@Body() loginDto: LoginUserDTO): Promise<boolean> {
    return await this.userService.login(loginDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findOneByEmail(email);
  }
}

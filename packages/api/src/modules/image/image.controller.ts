import {
  Controller,
  Get,
  Query,
  HttpCode,
  UsePipes,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import {ImageService} from './image.service';
import {CreateImageDTO} from './dto/create-image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async uplaod(userDto: CreateImageDTO) {
    return await this.imageService.upload(userDto);
  }

  @Get()
  async findOne(@Query('id') id: string) {
    return await this.imageService.findOne(id);
  }
}

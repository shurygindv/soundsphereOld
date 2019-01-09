import {
  Controller,
  Get,
  Post,
  UsePipes,
  HttpCode,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import {TrackService} from './track.service';
import {CreateTrackDTO} from './dto/create-track.dto';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async upload(trackDto: CreateTrackDTO) {
    return await this.trackService.upload(trackDto);
  }

  @Get()
  async findOne(@Query('id') id: string) {
    return await this.trackService.findOne(id);
  }
}

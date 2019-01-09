import {Injectable, ValidationPipe, UsePipes} from '@nestjs/common';

import {TrackRepository} from '../../repository/track/track.repository';
import {BaseService} from '../../shared';
import {CreateTrackDTO} from './dto/create-track.dto';
import {TrackEntity} from '../../repository/track/track.entity';

@Injectable()
export class TrackService extends BaseService {
  constructor(private readonly trackRepository: TrackRepository) {
    super();
  }

  @UsePipes(new ValidationPipe())
  async upload(trackDto: CreateTrackDTO): Promise<boolean> {
    const entity = new TrackEntity(
      trackDto.name,
      trackDto.data,
      trackDto.lyrics,
      trackDto.albumId,
    );

    return await this.trackRepository.create(entity);
  }

  // TODO: model
  async findOne(id: string): Promise<TrackEntity> {
    return await this.trackRepository.findOne(id);
  }
}

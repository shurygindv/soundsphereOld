import {Module} from '@nestjs/common';

import {ImageRepository} from './image/image.repository';
import {UserRepository} from './user/user.repository';
import {TrackRepository} from './track/track.repository';

@Module({
  providers: [UserRepository, ImageRepository, TrackRepository],
  exports: [UserRepository, ImageRepository, TrackRepository],
})
export class RepositoryModule {}

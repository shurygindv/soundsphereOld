import {Module} from '@nestjs/common';

import {ImageRepository} from './image/image.repository';
import {UserRepository} from './user/user.repository';

@Module({
  providers: [UserRepository, ImageRepository],
  exports: [UserRepository, ImageRepository],
})
export class RepositoryModule {}

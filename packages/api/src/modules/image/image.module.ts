import {Module} from '@nestjs/common';

import {RepositoryModule} from '../../repository/repository.module';
import {ImageController} from './image.controller';
import {ImageService} from './image.service';

@Module({
  imports: [RepositoryModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}

import {Module, Global} from '@nestjs/common';

import {UserModule} from './user/user.module';
import {ImageModule} from './image/image.module';
import {TrackModule} from './track/track.module';

@Global()
@Module({
  imports: [UserModule, ImageModule, TrackModule],
})
export class ApiModule {}

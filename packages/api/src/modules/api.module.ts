import {Module, Global} from '@nestjs/common';

import {UserModule} from './user/user.module';
import {ImageModule} from './image/image.module';

@Global()
@Module({
  imports: [UserModule, ImageModule],
})
export class ApiModule {}

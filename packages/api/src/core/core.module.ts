import {Module, Global} from '@nestjs/common';

import {DatabaseModule} from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
})
export class CoreModule {}

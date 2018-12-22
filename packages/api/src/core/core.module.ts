import {Module, Global} from '@nestjs/common';

import {DatabaseModule} from './database/database.module';
import {MapperService} from './mapper/mapper.service';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [MapperService],
  exports: [MapperService],
})
export class CoreModule {}

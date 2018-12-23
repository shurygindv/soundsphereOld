import {Module} from '@nestjs/common';

import {AppService} from './app.service';
import {ApiModule} from './modules/api.module';
import {AppController} from './app.controller';
import {CoreModule} from './core/core.module';
import {RepositoryModule} from './repository/repository.module';

@Module({
  imports: [ApiModule, CoreModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

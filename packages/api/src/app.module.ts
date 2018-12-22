import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {ApiModule} from './modules/api.module';
import {CoreModule} from './core/core.module';
import {RepositoryModule} from './repository/repository.module';

@Module({
  imports: [ApiModule, CoreModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

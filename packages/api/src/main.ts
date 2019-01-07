import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';

const VERSION = 'v1';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/${VERSION}`);
  app.enableCors();

  await app.listen(7777);
})();

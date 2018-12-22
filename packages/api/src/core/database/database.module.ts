import {Module, Provider} from '@nestjs/common';

import {DatabaseProvider} from './database.provider';
import {dbConfig} from '../config/db.config';

const DbProvider: Provider = {
  provide: DatabaseProvider,
  useFactory: async () => {
    const connection = await DatabaseProvider.create(dbConfig);

    await connection.connect();

    return connection;
  },
};

@Module({
  providers: [DbProvider],
  exports: [DbProvider],
})
export class DatabaseModule {}

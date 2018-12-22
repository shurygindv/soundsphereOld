import {Module} from '@nestjs/common';

import {DatabaseProvider} from './database.provider';
import {dbConfig} from '../config/db.config';

const DbProvider = {
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

import * as sql from 'mssql';

export class DatabaseProvider {
  static create(config: sql.config) {
    return new DatabaseProvider(config);
  }

  private connectionPool: sql.ConnectionPool;

  constructor(config: sql.config) {
    this.connectionPool = new sql.ConnectionPool(config);
  }

  async connect(): Promise<void> {
    try {
      await this.connectionPool.connect();

      console.log(this.connectionPool.connected && 'connected');
    } catch (e) {
      throw e;
    }
  }

  async close(): Promise<void> {
    await this.connectionPool.close();
  }

  request(): sql.Request {
    const request = this.connectionPool.request();

    return request;
  }
}

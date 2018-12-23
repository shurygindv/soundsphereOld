export interface IDbProvider {
  connect: () => Promise<void>;
  close: () => Promise<void>;
  request: () => any;
}

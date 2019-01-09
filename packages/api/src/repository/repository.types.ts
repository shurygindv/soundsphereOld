export interface ICrud<T> {
  create(entity: T): Promise<boolean>;

  // letter R
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;

  update(entity: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

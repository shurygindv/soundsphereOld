export interface ICrud<T> {
  create(entity: T): Promise<boolean>;

  //letter R
  findOne(id: number): Promise<T>;
  findAll(): Promise<T[]>;

  update(entity: T): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

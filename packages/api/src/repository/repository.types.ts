export interface ICrud<T> {
  create(entity: T): Promise<number>;

  //letter R
  findOne(id: number): Promise<T>;
  findAll(): Promise<T[]>;

  update(entity: T): Promise<number>;
  delete(id: number): Promise<boolean>;
}

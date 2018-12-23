export type Element<ArrayType> = ArrayType extends Array<infer ElementType>
  ? ElementType
  : ArrayType;

export type Class<T> = new (...args: any[]) => T;

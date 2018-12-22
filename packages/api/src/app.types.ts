export enum RoleType {
  User = 1,
  Moderator = 2,
  Administrator = 4,
}

export type Element<ArrayType> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : ArrayType;
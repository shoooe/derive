export type Exactly<Type, Other> = Type &
  Record<Exclude<keyof Other, keyof Type>, never>;

/**
 * Used to dermine if two types are exactly the same.
 *
 * @note Used in the form `X extends Exactly<Target, X>`.
 *
 * @package
 */
export type Exactly<Type, Other> = Type &
  Record<Exclude<keyof Other, keyof Type>, never>;

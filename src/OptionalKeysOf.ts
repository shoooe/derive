/**
 * Returns the union of keys from `Type` that are optional.
 *
 * @package
 *
 * @example
 * type Type = { a: number; b?: string; c?: string | null; d: number | null | undefined }
 * type Result = OptionalKeysOf<Type>; // 'b' | 'c'
 *
 * @see {@link https://stackoverflow.com/a/53899815}
 */
export type OptionalKeysOf<Type extends object> = Exclude<
  {
    [Key in keyof Type]: Type extends Record<Key, Type[Key]> ? never : Key;
  }[keyof Type],
  undefined
>;

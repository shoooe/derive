import { OptionalKeysOf } from './OptionalKeysOf';

/**
 * Returns the union of keys from `Type` that are required.
 *
 * @package
 * @example
 * type Type = { a: number; b?: string; c?: string | null; d: number | null | undefined }
 * type Result = RequiredKeysOf<Type>; // 'a' | 'd'
 */
export type RequiredKeysOf<Type extends object> = Exclude<
  keyof Type,
  OptionalKeysOf<Type>
>;

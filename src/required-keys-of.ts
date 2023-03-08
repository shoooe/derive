import { OptionalKeysOf } from './optional-keys-of';

/**
 * Returns the union of keys from `Type` that are required.
 *
 * @package
 *
 * @example
 * type Type = { a: number; b?: string; c?: string | null; d: number | null | undefined }
 * type Result = RequiredKeysOf<Type>; // 'a' | 'd'
 */
export type RequiredKeysOf<Type> = Exclude<keyof Type, OptionalKeysOf<Type>>;

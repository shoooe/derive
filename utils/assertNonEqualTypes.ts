import { assertEqualTypes } from './assertEqualTypes';

/**
 * Asserts that two types are not exactly the same.
 *
 * @see {@link https://github.com/millsp/ts-toolbelt/blob/7d6c44df57c5024d565041e33894660d868a2d86/sources/Any/Equals.ts}
 */
export declare function assertNonEqualTypes<Type, Expect>(): ReturnType<
  typeof assertEqualTypes<Type, Expect>
> extends true
  ? false
  : true;

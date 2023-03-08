/**
 * Asserts that two types are exactly the same.
 *
 * @see {@link https://github.com/millsp/ts-toolbelt/blob/7d6c44df57c5024d565041e33894660d868a2d86/sources/Any/Equals.ts}
 */
export declare function assertEqualTypes<Type, Expect>(): (<
  A
>() => A extends Expect ? true : false) extends <A>() => A extends Type
  ? true
  : false
  ? true
  : false;

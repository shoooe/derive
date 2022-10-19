/**
 * This is a no-op type that forces intellisense to evaluate the type
 * on hover (e.g. in Visual Studio Code).
 *
 * @package
 *
 * @see {@link https://stackoverflow.com/a/57683652/15992045}
 */
export type ForceIntellisenseExpansion<T> = T extends Record<symbol, unknown>
  ? { [K in keyof T]: ForceIntellisenseExpansion<T[K]> }
  : T extends Array<infer E>
  ? Array<ForceIntellisenseExpansion<E>>
  : T;

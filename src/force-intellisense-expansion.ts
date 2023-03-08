import { RecordLike } from './record-like';

/**
 * This is a no-op type that forces intellisense to evaluate the type
 * on hover (e.g. in Visual Studio Code).
 *
 * @package
 *
 * @see {@link https://stackoverflow.com/a/57683652/15992045}
 */
export type ForceIntellisenseExpansion<Type> = Type extends RecordLike
  ? { [Key in keyof Type]: ForceIntellisenseExpansion<Type[Key]> }
  : Type extends Array<infer Element>
  ? Array<ForceIntellisenseExpansion<Element>>
  : Type;

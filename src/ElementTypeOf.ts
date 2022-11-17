/**
 * If `Type` is an array it gets the element type of that array otherwise
 * it returns `Type`.
 *
 * @package
 */
export type ElementTypeOf<Type> = Type extends Array<infer Element>
  ? Element
  : Type;

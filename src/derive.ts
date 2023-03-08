import { AutocompleteHelper } from './autocomplete-helper';
import { ForceIntellisenseExpansion } from './force-intellisense-expansion';
import { RecordLike } from './record-like';
import { ValidShape } from './valid-shape';
import { OptionalKeysOf } from './optional-keys-of';

/**
 * Utility  to derive a type from another type.
 *
 * @example
 * type Result = Derive<
 *   User,
 *   {
 *      id: true;
 *      name: true;
 *      bestFriend: {
 *        id: true;
 *      };
 *   }
 * >;
 */
export type Derive<
  Target,
  Shape extends AutocompleteHelper<Target> & ValidShape<Target, Shape>,
> = ForceIntellisenseExpansion<ResolveShape<Target, Shape>>;

/**
 * Resolves a shape.
 *
 * @package
 */
type ResolveShape<Target, Shape> = Target extends null | undefined
  ? ResolveShape<NonNullable<Target>, Shape> | Extract<Target, null | undefined>
  : Target extends Array<infer ElementType>
  ? Array<ResolveShape<ElementType, Shape>>
  : Shape extends true
  ? Target
  : Shape extends RecordLike
  ? Target extends RecordLike
    ? ResolveObjectType<Target, Shape>
    : Shape
  : Shape;

/**
 * Resolves the type of an object based on some shape type.
 * Takes into consideration the optionality of fields from both the target
 * and shape type.
 *
 * @package
 */
type ResolveObjectType<
  Target extends RecordLike,
  Shape extends RecordLike,
> = ResolveRequiredFields<Target, Shape> & ResolveOptionalFields<Target, Shape>;

type ResolveRequiredFields<
  BaseType extends RecordLike,
  Shape extends RecordLike,
> = {
  [Key in ResultRequiredKeys<BaseType, Shape>]: Key extends keyof BaseType
    ? ResolveShape<BaseType[Key], Shape[Key]>
    : Shape[Key];
};

type ResolveOptionalFields<
  BaseType extends RecordLike,
  Shape extends RecordLike,
> = {
  [Key in ResultOptionalKeys<BaseType, Shape>]?: Key extends keyof BaseType
    ? ResolveShape<BaseType[Key], Shape[Key]>
    : Shape[Key];
};

/**
 * Gives a subset of `keyof ShapeType` that should be optioal in the
 * derived result type.
 *
 * @package
 */
type ResultOptionalKeys<
  Target extends RecordLike,
  Shape extends RecordLike,
> = Exclude<
  {
    [Key in keyof Shape]: Key extends OptionalKeysOf<Target>
      ? Key
      : never;
  }[keyof Shape],
  undefined
>;

/**
 * Gives a subset of `keyof ShapeType` that should be required in the
 * derived result type.
 *
 * @package
 */
type ResultRequiredKeys<
  Target extends RecordLike,
  Shape extends RecordLike,
> = Exclude<keyof Shape, ResultOptionalKeys<Target, Shape>>;

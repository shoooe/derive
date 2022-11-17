import { Alias } from './Alias';
import { Auto } from './Auto';
import { AutocompleteHelper } from './AutocompleteHelper';
import { ForceIntellisenseExpansion } from './ForceIntellisenseExpansion';
import { RecordLike } from './RecordLike';
import { ValidShape } from './ValidShape';
import { OptionalKeysOf } from './OptionalKeysOf';

/**
 * Utility  to derive a type from another type.
 *
 * @example
 * type Result = Derive<
 *   User,
 *   {
 *      id: Auto;
 *      name: Auto;
 *      bestFriend: {
 *        id: Auto;
 *      };
 *   }
 * >;
 */
export type Derive<
  Target,
  Shape extends AutocompleteHelper<Target> & ValidShape<Target, Shape>,
> = ForceIntellisenseExpansion<ResolveAutos<Target, ResolveAliases<Shape>>>;

/**
 * Only resolves aliases.
 *
 * @package
 */
type ResolveAliases<Shape> = Shape extends Alias<
  infer AliasTarget,
  infer AliasKey,
  infer AliasShape
>
  ? ResolveAutos<AliasTarget[AliasKey], AliasShape>
  : Shape;

/**
 * Resolves a shape.
 *
 * @package
 */
type ResolveAutos<Target, Shape> = Target extends null | undefined
  ? ResolveAutos<NonNullable<Target>, Shape> | Extract<Target, null | undefined>
  : Target extends Array<infer ElementType>
  ? Array<ResolveAutos<ElementType, Shape>>
  : Shape extends Auto
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
    ? ResolveAutos<BaseType[Key], ResolveAliases<Shape[Key]>>
    : ResolveAliases<Shape[Key]>;
};

type ResolveOptionalFields<
  BaseType extends RecordLike,
  Shape extends RecordLike,
> = {
  [Key in ResultOptionalKeys<BaseType, Shape>]?: Key extends keyof BaseType
    ? ResolveAutos<BaseType[Key], ResolveAliases<Shape[Key]>>
    : ResolveAliases<Shape[Key]>;
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
      : Shape[Key] extends Alias<
          infer AliasTarget,
          infer AliasKey,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          infer _AliasShape
        >
      ? AliasKey extends OptionalKeysOf<AliasTarget>
        ? Key
        : never
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

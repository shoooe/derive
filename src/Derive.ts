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
> = ForceIntellisenseExpansion<ResolveAuto<Target, Shape>>;

type ResolveAliases<Shape> = Shape extends Alias<
  infer AliasTarget,
  infer AliasKey,
  infer AliasShape
>
  ? ResolveAuto<AliasTarget[AliasKey], AliasShape>
  : Shape;

type ResolveAuto<Target, Shape> = Shape extends Alias<
  infer AliasTarget,
  infer AliasKey,
  infer AliasShape
>
  ? ResolveAuto<AliasTarget[AliasKey], AliasShape>
  : Target extends null | undefined
  ? ResolveAuto<NonNullable<Target>, Shape> | Extract<Target, null | undefined>
  : Target extends Array<infer ElementType>
  ? Array<ResolveAuto<ElementType, Shape>>
  : Target extends RecordLike
  ? Shape extends RecordLike
    ? ResolveObjectType<Target, Shape>
    : // Target is a record but shape isn't.
      // This means that the shape is `Auto` when target is
      // a record, which makes no sense and is not allowed by `ValidShape`.
      never
  : Shape extends Auto
  ? Target
  : Shape;

type ResolveObjectType<
  Target extends RecordLike,
  Shape extends RecordLike,
> = ResolveRequiredFields<Target, Shape> & ResolveOptionalFields<Target, Shape>;

type ResolveRequiredFields<
  BaseType extends RecordLike,
  Shape extends RecordLike,
> = {
  [Key in ResultRequiredKeys<BaseType, Shape>]: Key extends keyof BaseType
    ? ResolveAuto<BaseType[Key], Shape[Key]>
    : ResolveAliases<Shape[Key]>;
};

type ResolveOptionalFields<
  BaseType extends RecordLike,
  Shape extends RecordLike,
> = {
  [Key in ResultOptionalKeys<BaseType, Shape>]?: Key extends keyof BaseType
    ? ResolveAuto<BaseType[Key], Shape[Key]>
    : ResolveAliases<Shape[Key]>;
};

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

type ResultRequiredKeys<
  Target extends RecordLike,
  Shape extends RecordLike,
> = Exclude<keyof Shape, ResultOptionalKeys<Target, Shape>>;

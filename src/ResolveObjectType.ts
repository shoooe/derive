import { ResolveAuto } from './ResolveAuto';
import { ResultRequiredKeys } from './ResultRequiredKeys';
import { ResolveAliases } from './ResolveAliases';
import { ResultOptionalKeys } from './ResultOptionalKeys';
import { RecordLike } from './RecordLike';

/**
 * Resolves the type of an object based on some shape type.
 * Takes into consideration the optionality of fields from both the target
 * and shape type.
 *
 * @package
 */
export type ResolveObjectType<
  Target extends RecordLike,
  Shape,
> = ResolveRequiredFields<Target, Shape> & ResolveOptionalFields<Target, Shape>;

type ResolveRequiredFields<Target extends RecordLike, Shape> = {
  [KeyType in ResultRequiredKeys<Target, Shape>]: KeyType extends keyof Target
    ? ResolveAuto<Target[KeyType], Shape[KeyType]>
    : ResolveAliases<Shape[KeyType]>;
};

type ResolveOptionalFields<Target extends RecordLike, Shape> = {
  [KeyType in ResultOptionalKeys<Target, Shape>]?: KeyType extends keyof Target
    ? ResolveAuto<Target[KeyType], Shape[KeyType]>
    : ResolveAliases<Shape[KeyType]>;
};

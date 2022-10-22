import { ResolveAuto } from './ResolveAuto';
import { ObjectShapeLike } from './ObjectShapeLike';
import { ResultRequiredKeys } from './ResultRequiredKeys';
import { ResolveAliases } from './ResolveAliases';
import { ResultOptionalKeys } from './ResultOptionalKeys';

/**
 * Resolves the type of an object based on some shape type.
 * Takes into consideration the optionality of fields from both the base
 * and shape type.
 *
 * @package
 */
export type ResolveObjectType<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = ResolveRequiredFields<BaseType, ShapeType> &
  ResolveOptionalFields<BaseType, ShapeType>;

type ResolveRequiredFields<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = {
  [KeyType in ResultRequiredKeys<
    BaseType,
    ShapeType
  >]: KeyType extends keyof BaseType
    ? ResolveAuto<BaseType[KeyType], ShapeType[KeyType]>
    : ResolveAliases<ShapeType[KeyType]>;
};

type ResolveOptionalFields<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = {
  [KeyType in ResultOptionalKeys<
    BaseType,
    ShapeType
  >]?: KeyType extends keyof BaseType
    ? ResolveAuto<BaseType[KeyType], ShapeType[KeyType]>
    : ResolveAliases<ShapeType[KeyType]>;
};

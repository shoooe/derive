import type { OptionalKeysOf } from './OptionalKeysOf';
import type { RequiredKeysOf } from './RequiredKeysOf';
import type { ResolveType } from './ResolveType';
import type { ObjectShapeLike } from './ObjectShapeLike';

/**
 * Resolves the type of an object based on some shape type.
 *
 * @package
 *
 * @see Derive
 */
export type ResolveObjectType<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = {
  [KeyType in keyof ShapeType as KeyType extends RequiredKeysOf<BaseType>
    ? KeyType
    : never]: KeyType extends keyof BaseType
    ? ResolveType<BaseType[KeyType], ShapeType[KeyType]>
    : // `KeyType extends RequiredKeysOf<BaseType>` implies `KeyType extends keyof BaseType`
      // so this will _never_ happen.
      // TODO: check if we can remove this in future TS versions
      never;
} & {
  [KeyType in keyof ShapeType as KeyType extends OptionalKeysOf<BaseType>
    ? KeyType
    : never]?: KeyType extends keyof BaseType
    ? ResolveType<BaseType[KeyType], ShapeType[KeyType]>
    : // `KeyType extends OptionalKeysOf<BaseType>` implies `KeyType extends keyof BaseType`
      // so this will _never_ happen.
      // TODO: check if we can remove this in future TS versions
      never;
} & {
  [KeyType in keyof ShapeType as KeyType extends Exclude<
    keyof ShapeType,
    keyof BaseType
  >
    ? KeyType
    : never]: ShapeType[KeyType];
};

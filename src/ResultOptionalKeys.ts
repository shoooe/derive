import { Alias } from './Alias';
import { OptionalKeysOf } from './OptionalKeysOf';

/**
 * Gives a subset of `keyof ShapeType` that should be optional in the
 * derive result type.
 *
 * @package
 */
export type ResultOptionalKeys<
  BaseType extends Record<symbol, unknown>,
  ShapeType,
> = Exclude<
  {
    [KeyType in keyof ShapeType]: KeyType extends OptionalKeysOf<ShapeType>
      ? KeyType
      : KeyType extends OptionalKeysOf<BaseType>
      ? KeyType
      : ShapeType[KeyType] extends Alias<
          infer AliasBaseType,
          infer AliasKeyType,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          infer _AliasShapeType
        >
      ? AliasKeyType extends OptionalKeysOf<AliasBaseType>
        ? KeyType
        : never
      : never;
  }[keyof ShapeType],
  undefined
>;

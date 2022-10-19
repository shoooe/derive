import type { Auto } from './Auto';
import type { CoreTypeOf } from './CoreTypeOf';
import type { ShapeLike } from './ShapeLike';

/**
 * Represents the possible shape values for a given field.
 *
 * @package
 */
export type ShapeFieldLike<
  BaseType extends Record<symbol, unknown>,
  KeyType extends keyof BaseType,
> = CoreTypeOf<BaseType[KeyType]> extends Record<symbol, unknown>
  ? ShapeLike<CoreTypeOf<BaseType[KeyType]>>
  : Auto | null | undefined;

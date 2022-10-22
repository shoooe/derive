import type { Auto } from './Auto';
import type { CoreTypeOf } from './CoreTypeOf';
import type { ObjectShapeLike } from './ObjectShapeLike';

/**
 * Represents the possible shape values for a given field.
 *
 * @package
 */
export type ShapeLike<BaseType> = CoreTypeOf<BaseType> extends Record<
  symbol,
  unknown
>
  ? ObjectShapeLike<CoreTypeOf<BaseType>>
  : Auto | null | undefined;

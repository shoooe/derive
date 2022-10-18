import type { CoreTypeOf } from './CoreTypeOf';
import type { Auto } from './Auto';

/**
 * Internal representation of the shape of the derived type.
 *
 * @package
 * @example
 * {
 *     first: Auto;
 *     second: Auto | null;
 *     third: {
 *         fourth: Auto;
 *         fifth: boolean;
 *     }
 * }
 */
export type ShapeLike<BaseType extends Record<symbol, unknown>> = {
  [KeyType in keyof BaseType]?: CoreTypeOf<BaseType[KeyType]> extends Record<
    symbol,
    unknown
  >
    ? ShapeLike<CoreTypeOf<BaseType[KeyType]>>
    : Auto | null | undefined;
};

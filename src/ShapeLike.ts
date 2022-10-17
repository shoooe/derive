import type { CoreTypeOf } from './CoreTypeOf';
import type { Infer } from './Infer';

/**
 * Internal representation of the shape of the derived type.
 *
 * @private
 * @example
 * {
 *     first: Infer;
 *     second: Infer | null;
 *     third: {
 *         fourth: Infer;
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
    : Infer | null | undefined;
};

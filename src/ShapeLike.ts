import { ShapeFieldLike } from './ShapeFieldLike';

/**
 * Internal representation of the shape of the derived type.
 *
 * @package
 *
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
  [KeyType in keyof BaseType]?: ShapeFieldLike<BaseType, KeyType>;
};

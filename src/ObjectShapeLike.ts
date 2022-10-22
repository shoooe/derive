import { ShapeLike } from './ShapeLike';

/**
 * Represents the shape for an object.
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
export type ObjectShapeLike<BaseType extends Record<symbol, unknown>> = {
  [KeyType in keyof BaseType]?: ShapeLike<BaseType[KeyType]>;
};

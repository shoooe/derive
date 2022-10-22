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
export type ObjectShapeLike<BaseType extends Record<symbol, unknown>> =
  IndexSignatureForWeakType & {
    [KeyType in keyof BaseType]?: ShapeLike<BaseType[KeyType]>;
  };

/**
 * Weak types (objects that only have optional properties) are not assignable to objects
 * that have no key that intersects with keyof said object.
 * This is a workaround for making that work instead.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#weak-type-detection}
 */
type IndexSignatureForWeakType = {
  [propName: string]: unknown;
};

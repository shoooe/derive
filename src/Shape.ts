import type { ObjectShapeLike } from './ObjectShapeLike';

/**
 * Type used to define a shape that can then be reused as a `Derive` shape
 * or inside other shapes.
 *
 * @example
 * type Custom = Shape<Base, {
 *     first: Auto;
 *     second: Auto | null;
 *     third: {
 *         fourth: Auto;
 *         fifth: boolean;
 *     }
 * }>;
 */
export type Shape<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = ShapeType;

import { ShapeLike } from './ShapeLike';

/**
 * Type used to define a shape that can then be reused as a `Derive` shape
 * or inside other shapes.
 *
 * @example
 * type Custom = Shape<Base, {
 *     first: Infer;
 *     second: Infer | null;
 *     third: {
 *         fourth: Infer;
 *         fifth: boolean;
 *     }
 * }>;
 */
export type Shape<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ShapeLike<BaseType>,
> = ShapeType;

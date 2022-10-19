import type { ShapeLike } from './ShapeLike';
import type { ForceIntellisenseExpansion } from './ForceIntellisenseExpansion';
import type { NonExpandedDerive } from './NonExpandedDerive';

/**
 *
 */
export type Derive<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ShapeLike<BaseType>,
> = ForceIntellisenseExpansion<NonExpandedDerive<BaseType, ShapeType>>;

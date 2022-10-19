import type { Auto } from './Auto';
import type { NonExpandedDerive } from './NonExpandedDerive';
import type { ShapeLike } from './ShapeLike';

/**
 * Resolves the field of an object given its type in the base type
 * and its type in the corresponding shape.
 *
 * @package
 */
export type ResolveType<BaseFieldType, ShapeFieldType> = BaseFieldType extends
  | null
  | undefined
  ?
      | ResolveType<NonNullable<BaseFieldType>, ShapeFieldType>
      | Extract<BaseFieldType, null | undefined>
  : BaseFieldType extends Array<infer ElementType>
  ? Array<ResolveType<ElementType, ShapeFieldType>>
  : BaseFieldType extends Record<symbol, unknown>
  ? ShapeFieldType extends ShapeLike<BaseFieldType>
    ? NonExpandedDerive<BaseFieldType, ShapeFieldType>
    : never
  : ShapeFieldType extends null | undefined
  ?
      | ResolveType<BaseFieldType, NonNullable<ShapeFieldType>>
      | Extract<ShapeFieldType, null | undefined>
  : ShapeFieldType extends Auto
  ? BaseFieldType
  : ShapeFieldType;

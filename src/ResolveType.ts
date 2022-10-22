import type { Auto } from './Auto';
import type { ResolveObjectType } from './ResolveObjectType';
import type { ShapeLike } from './ShapeLike';

/**
 * Resolves the field of an object given its type in the base type
 * and its type in the corresponding shape.
 *
 * @package
 */
export type ResolveType<
  BaseFieldType,
  ShapeType extends ShapeLike<BaseFieldType>,
> = BaseFieldType extends null | undefined
  ?
      | ResolveType<NonNullable<BaseFieldType>, ShapeType>
      | Extract<BaseFieldType, null | undefined>
  : BaseFieldType extends Array<infer ElementType>
  ? Array<ResolveType<ElementType, ShapeType>>
  : BaseFieldType extends Record<symbol, unknown>
  ? ResolveObjectType<BaseFieldType, ShapeType>
  : ShapeType extends null | undefined
  ?
      | ResolveType<BaseFieldType, NonNullable<ShapeType>>
      | Extract<ShapeType, null | undefined>
  : ShapeType extends Auto
  ? BaseFieldType
  : ShapeType;

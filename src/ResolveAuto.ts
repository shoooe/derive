import { Auto } from './Auto';
import { ResolveObjectType } from './ResolveObjectType';

/**
 * Resolves the field of an object given its type in the base type
 * and its type in the corresponding shape.
 *
 * @package
 */
export type ResolveAuto<BaseType, ShapeType> = BaseType extends null | undefined
  ?
      | ResolveAuto<NonNullable<BaseType>, ShapeType>
      | Extract<BaseType, null | undefined>
  : BaseType extends Array<infer ElementType>
  ? Array<ResolveAuto<ElementType, ShapeType>>
  : BaseType extends Record<symbol, unknown>
  ? ResolveObjectType<BaseType, ShapeType>
  : ShapeType extends null | undefined
  ?
      | ResolveAuto<BaseType, NonNullable<ShapeType>>
      | Extract<ShapeType, null | undefined>
  : ShapeType extends Auto
  ? BaseType
  : ShapeType;

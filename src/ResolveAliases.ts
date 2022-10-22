import { Alias } from './Alias';
import { ResolveAuto } from './ResolveAuto';

/**
 * Resolves aliases from `ShapeType`.
 *
 * @package
 */
export type ResolveAliases<ShapeType> = ShapeType extends null | undefined
  ?
      | ResolveAliases<NonNullable<ShapeType>>
      | Extract<ShapeType, null | undefined>
  : ShapeType extends Array<infer ElementType>
  ? Array<ResolveAliases<ElementType>>
  : ShapeType extends Alias<
      infer AliasBaseType,
      infer AliasKeyType,
      infer AliasShapeType
    >
  ? ResolveAuto<AliasBaseType[AliasKeyType], AliasShapeType>
  : ShapeType;

import { Alias } from './Alias';
import { ResolveAuto } from './ResolveAuto';

/**
 * Resolves aliases given a shape.
 *
 * @package
 */
export type ResolveAliases<Shape> = Shape extends Alias<
  infer AliasBaseType,
  infer AliasKeyType,
  infer AliasShapeType
>
  ? ResolveAuto<AliasBaseType[AliasKeyType], AliasShapeType>
  : Shape;

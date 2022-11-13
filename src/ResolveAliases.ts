import { Alias } from './Alias';
import { ResolveAuto } from './ResolveAuto';

/**
 * Resolves aliases given a shape.
 *
 * @package
 */
export type ResolveAliases<Shape> = Shape extends Alias<
  infer AliasTarget,
  infer AliasKey,
  infer AliasShape
>
  ? ResolveAuto<AliasTarget[AliasKey], AliasShape>
  : Shape;

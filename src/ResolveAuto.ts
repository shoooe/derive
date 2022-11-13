import { Auto } from './Auto';
import { RecordLike } from './RecordLike';
import { ResolveObjectType } from './ResolveObjectType';

/**
 * Resolves the field of an object given its type in the base type
 * and its type in the corresponding shape.
 *
 * @package
 */
export type ResolveAuto<Target, Shape> = Target extends null | undefined
  ? ResolveAuto<NonNullable<Target>, Shape> | Extract<Target, null | undefined>
  : Target extends Array<infer ElementType>
  ? Array<ResolveAuto<ElementType, Shape>>
  : Target extends RecordLike
  ? ResolveObjectType<Target, Shape>
  : Shape extends Auto
  ? Target
  : Shape;

import { DefaultShape } from './DefaultShape';
import { ForceIntellisenseExpansion } from './ForceIntellisenseExpansion';
import { ResolveAuto } from './ResolveAuto';
import { ShapeLike } from './ShapeLike';

/**
 * Utility used to derive a type from another type.
 *
 * @example
 * type Result = Derive<
 *   User,
 *   {
 *      id: Auto;
 *      name: Auto;
 *      bestFriend: {
 *        id: Auto;
 *      };
 *      extraField?: boolean;
 *   }
 * >;
 */
export type Derive<
  BaseType,
  ShapeType extends ShapeLike<BaseType> = DefaultShape<BaseType>,
> = ForceIntellisenseExpansion<ResolveAuto<BaseType, ShapeType>>;

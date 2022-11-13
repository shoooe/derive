import { AutocompleteHelper } from './AutocompleteHelper';
import { ForceIntellisenseExpansion } from './ForceIntellisenseExpansion';
import { ResolveAuto } from './ResolveAuto';
import { ValidShape } from './ValidShape';

/**
 * Utility  to derive a type from another type.
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
 *   }
 * >;
 */
export type Derive<
  Target,
  Shape extends AutocompleteHelper<Target> & ValidShape<Target, Shape>,
> = ForceIntellisenseExpansion<ResolveAuto<Target, Shape>>;

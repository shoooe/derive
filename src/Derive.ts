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
 *      extraField?: boolean;
 *   }
 * >;
 */
export type Derive<
  Base,
  Shape extends AutocompleteHelper<Base> & ValidShape<Base, Shape>,
> = ForceIntellisenseExpansion<ResolveAuto<Base, Shape>>; // @todo Resolve Auto here?

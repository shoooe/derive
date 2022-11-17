import { AutocompleteHelper } from './AutocompleteHelper';
import { RecordLike } from './RecordLike';
import { ValidShape } from './ValidShape';

/**
 * Marker type for an alias.
 */
export class Alias<
  Target extends RecordLike,
  Key extends keyof Target,
  Shape extends AutocompleteHelper<Target[Key]> &
    ValidShape<Target[Key], Shape>,
> {
  private __target!: Target;
  private __key!: Key;
  private __shape!: Shape;
}

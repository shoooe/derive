/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoreTypeOf } from './core-type-of';
import { RecordLike } from './record-like';

/**
 * Represents the possible shape values for a given target type fields.
 *
 * @note This is used to provide some basic type checking for aliases and to
 * provide autocomplete for shapes (via optional properties).
 *
 * @package
 */
export type AutocompleteHelper<Target> = CoreTypeOf<Target> extends RecordLike
  ? {
      [Key in keyof CoreTypeOf<Target>]?: AutocompleteHelper<
        CoreTypeOf<Target>[Key]
      >;
    }
  : true;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alias } from './Alias';
import { Auto } from './Auto';
import { CoreTypeOf } from './CoreTypeOf';
import { ObjectLike } from './ObjectLike';

/**
 * Represents the possible shape values for a given target type fields.
 *
 * @note This is used to provide some basic type checking for aliases and to
 * provide autocomplete for shapes (via optional properties).
 *
 * @package
 */
export type AutocompleteHelper<Target> = CoreTypeOf<Target> extends ObjectLike
  ? {
      [Key in keyof CoreTypeOf<Target>]?: AutocompleteHelper<
        CoreTypeOf<Target>[Key]
      >;
    }
  : Auto | Alias<any, any, any>;

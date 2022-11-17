/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alias } from './Alias';
import { Auto } from './Auto';
import { CoreTypeOf } from './CoreTypeOf';
import { Exactly } from './Exactly';
import { RecordLike } from './RecordLike';

/**
 * Usually used in `extends` clause to check that a shape is a valid shape
 * for the given target.
 *
 * @package
 */
export type ValidShape<Target, Shape> = CoreTypeOf<Target> extends RecordLike
  ? // The array here is needed to avoid errors about circular constraints.
    [Shape] extends [RecordLike]
    ? // Exactly here is needed to specify that no other keys are allowed.
      Exactly<
        // For keys that are shared between target and shape we dive deeper.
        {
          [Key in Extract<keyof Shape, keyof CoreTypeOf<Target>>]: ValidShape<
            CoreTypeOf<Target>[Key],
            Shape[Key]
          >;
        } & {
          // For everything else we only accept Alias.
          [Key in Exclude<keyof Shape, keyof CoreTypeOf<Target>>]: Alias<
            any,
            any,
            any
          >;
        },
        Shape
      >
    : // If the target is an object and the shape is not then it can only be an alias.
      Alias<any, any, any>
  : Auto | Alias<any, any, any>;

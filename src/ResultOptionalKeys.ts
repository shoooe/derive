import { Alias } from './Alias';
import { RecordLike } from './RecordLike';
import { OptionalKeysOf } from './OptionalKeysOf';

/**
 * Gives a subset of `keyof Shape` that should be optional in the
 * derive result type.
 *
 * @package
 */
export type ResultOptionalKeys<Target extends RecordLike, Shape> = Exclude<
  {
    [KeyType in keyof Shape]: KeyType extends OptionalKeysOf<Shape>
      ? KeyType
      : KeyType extends OptionalKeysOf<Target>
      ? KeyType
      : Shape[KeyType] extends Alias<
          infer AliasTarget,
          infer AliasKey,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          infer _AliasShape
        >
      ? AliasKey extends OptionalKeysOf<AliasTarget>
        ? KeyType
        : never
      : never;
  }[keyof Shape],
  undefined
>;

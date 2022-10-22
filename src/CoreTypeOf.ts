import type { ElementTypeOf } from './ElementTypeOf';

/**
 * Gets the core type of another type by stripping array notations, `null` and
 * `undefined` from that type.
 *
 * @package
 */
export type CoreTypeOf<BaseType> = NonNullable<ElementTypeOf<BaseType>>;

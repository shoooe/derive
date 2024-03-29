import { ElementTypeOf } from './element-type-of';

/**
 * Gets the core type of another type by stripping array notations, `null` and
 * `undefined` from that type.
 *
 * @package
 */
export type CoreTypeOf<Type> = ElementTypeOf<NonNullable<Type>>;

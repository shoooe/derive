import { ObjectShapeLike } from './ObjectShapeLike';
import { ResultOptionalKeys } from './ResultOptionalKeys';

/**
 * Gives a subset of `keyof ShapeType` that should be required in the
 * derive result type.
 *
 * @package
 */
export type ResultRequiredKeys<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ObjectShapeLike<BaseType>,
> = Exclude<keyof ShapeType, ResultOptionalKeys<BaseType, ShapeType>>;

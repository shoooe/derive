import { ObjectLike } from './ObjectLike';
import { ResultOptionalKeys } from './ResultOptionalKeys';

/**
 * Gives a subset of `keyof ShapeType` that should be required in the
 * derive result type.
 *
 * @package
 */
export type ResultRequiredKeys<Target extends ObjectLike, Shape> = Exclude<
  keyof Shape,
  ResultOptionalKeys<Target, Shape>
>;

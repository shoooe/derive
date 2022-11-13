import { RecordLike } from './RecordLike';
import { ResultOptionalKeys } from './ResultOptionalKeys';

/**
 * Gives a subset of `keyof ShapeType` that should be required in the
 * derive result type.
 *
 * @package
 */
export type ResultRequiredKeys<Target extends RecordLike, Shape> = Exclude<
  keyof Shape,
  ResultOptionalKeys<Target, Shape>
>;

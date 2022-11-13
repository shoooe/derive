import { Auto } from './Auto';
import { CoreTypeOf } from './CoreTypeOf';
import { RecordLike } from './RecordLike';
import { EmptyRecord } from './EmptyRecord';

/**
 * Defines the default shape for a give target type.
 * For an object like type it's an empty record otherwise it's Auto.
 *
 * @package
 */
export type DefaultShape<Target> = CoreTypeOf<Target> extends RecordLike
  ? EmptyRecord
  : Auto;

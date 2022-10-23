import { Auto } from './Auto';
import { CoreTypeOf } from './CoreTypeOf';

/**
 * @todo
 */
export type DefaultShape<BaseType> = CoreTypeOf<BaseType> extends Record<
  symbol,
  unknown
>
  ? Record<symbol, never>
  : Auto;

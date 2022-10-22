import { ResolveType } from './ResolveType';
import type { ShapeFieldLike } from './ShapeFieldLike';

/**
 * @todo
 **/
export type Alias<
  BaseType extends Record<symbol, unknown>,
  KeyType extends keyof BaseType,
  ShapeType extends ShapeFieldLike<BaseType, KeyType>,
> = ResolveType<BaseType[KeyType], ShapeType>;

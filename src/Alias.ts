import type { ShapeFieldLike } from './ShapeFieldLike';

/**
 * @todo
 **/
export class Alias<
  BaseType extends Record<symbol, unknown>,
  KeyType extends keyof BaseType,
  ShapeType extends ShapeFieldLike<BaseType, KeyType>,
> {
  private __baseType!: BaseType;
  private __keyType!: KeyType;
  private __shapeType!: ShapeType;
}

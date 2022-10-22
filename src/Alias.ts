import { Auto } from './Auto';
import { ShapeLike } from './ShapeLike';

/**
 * Marker type for an alias.
 */
export class Alias<
  BaseType extends Record<symbol, unknown>,
  KeyType extends keyof BaseType,
  ShapeType extends ShapeLike<BaseType[KeyType]> = Auto,
> {
  private __baseType!: BaseType;
  private __keyType!: KeyType;
  private __shapeType!: ShapeType;
}

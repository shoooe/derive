import type { ShapeLike } from './ShapeLike';
import type { ForceIntellisenseExpansion } from './ForceIntellisenseExpansion';
import { Auto } from './Auto';

/**
 * Resolves the field of an object given its type in the base type
 * and its type in the corresponding shape.
 *
 * @package
 */
type ResolveFieldType<BaseFieldType, ShapeFieldType> = BaseFieldType extends
  | null
  | undefined
  ?
      | ResolveFieldType<NonNullable<BaseFieldType>, ShapeFieldType>
      | Extract<BaseFieldType, null | undefined>
  : BaseFieldType extends Array<infer ElementType>
  ? Array<ResolveFieldType<ElementType, ShapeFieldType>>
  : BaseFieldType extends Record<symbol, unknown>
  ? ShapeFieldType extends ShapeLike<BaseFieldType>
    ? NonExpandedDerive<BaseFieldType, ShapeFieldType>
    : never
  : ShapeFieldType extends null | undefined
  ?
      | ResolveFieldType<BaseFieldType, NonNullable<ShapeFieldType>>
      | Extract<ShapeFieldType, null | undefined>
  : ShapeFieldType extends Auto
  ? BaseFieldType
  : ShapeFieldType;

/**
 * Internal representation for `Derive` which is not expanded by intellisense.
 *
 * @see Derive
 * @package
 */
type NonExpandedDerive<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ShapeLike<BaseType>,
> = {
  [KeyType in keyof ShapeType]: KeyType extends keyof BaseType
    ? ResolveFieldType<BaseType[KeyType], ShapeType[KeyType]>
    : ShapeType[KeyType];
};

/**
 *
 */
export type Derive<
  BaseType extends Record<symbol, unknown>,
  ShapeType extends ShapeLike<BaseType>,
> = ForceIntellisenseExpansion<NonExpandedDerive<BaseType, ShapeType>>;

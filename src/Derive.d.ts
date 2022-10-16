// Marker type
// Reference: https://michalzalecki.com/nominal-typing-in-typescript/
export class Infer {
  private __nominal: void;
}

// Excludes null, undefined and arrays from the type definition.
// For example:
//   • Array<T | null> -> T
//   • T | undefined | null -> T
export type ExcludeDecorations<RootType> = RootType extends null
  ? Exclude<RootType, null>
  : RootType extends undefined
  ? Exclude<RootType, undefined>
  : RootType extends Array<infer ElementType>
  ? ElementType
  : RootType;

// Represents the shape of the derived type.
// For example:
// {
//     first: Infer;
//     second: Infer | null;
//     third: {
//         fourth: Infer;
//         fifth: boolean;
//     }
// }
type _Shape<RootType extends Record<symbol, unknown>> = {
  [KeyType in keyof RootType]?: ExcludeDecorations<
    RootType[KeyType]
  > extends Record<symbol, unknown>
    ? _Shape<ExcludeDecorations<RootType[KeyType]>>
    : Infer | null | undefined;
};

export type Shape<
  RootType extends Record<symbol, unknown>,
  ShapeType extends _Shape<RootType>
> = ShapeType;

// Resolves `Infer` for an existing field (field that is also in `RootType`).
export type ResolveRootFieldType<RootFieldType, ShapeFieldType> =
  RootFieldType extends null
    ? ResolveRootFieldType<Exclude<RootFieldType, null>, ShapeFieldType> | null
    : RootFieldType extends undefined
    ?
        | ResolveRootFieldType<
            Exclude<RootFieldType, undefined>,
            ShapeFieldType
          >
        | undefined
    : RootFieldType extends Array<infer ElementType>
    ? Array<ResolveRootFieldType<ElementType, ShapeFieldType>>
    : RootFieldType extends Record<symbol, unknown>
    ? ShapeFieldType extends _Shape<RootFieldType>
      ? _ShapeInto<RootFieldType, ShapeFieldType>
      : ShapeFieldType
    : ShapeFieldType extends null
    ? ResolveRootFieldType<RootFieldType, Exclude<ShapeFieldType, null>> | null
    : ShapeFieldType extends undefined
    ?
        | ResolveRootFieldType<
            RootFieldType,
            Exclude<ShapeFieldType, undefined>
          >
        | undefined
    : ShapeFieldType extends Infer
    ? RootFieldType
    : ShapeFieldType;

// Actual implementation (that is not automatically expanded by intellisense).
type _ShapeInto<
  RootType extends Record<symbol, unknown>,
  ShapeType extends _Shape<RootType>
> = {
  [KeyType in keyof ShapeType]: KeyType extends keyof RootType
    ? // `KeyType` is both a key in `RootType` and `ShapeType`.
      ResolveRootFieldType<RootType[KeyType], ShapeType[KeyType]>
    : // Custom property so we just use the field from the shape.
      ShapeType[KeyType];
};

// This is just a no-op type that makes the IDE evaluate the definition of type
// on hover.
// Reference: https://stackoverflow.com/a/57683652/15992045
type _ForceEditorEvaluation<T> = T extends Record<symbol, unknown>
  ? T extends infer O
    ? { [K in keyof O]: _ForceEditorEvaluation<O[K]> }
    : never
  : T;

export type Derive<
  RootType extends Record<symbol, unknown>,
  ShapeType extends _Shape<RootType>
> = _ForceEditorEvaluation<_ShapeInto<RootType, ShapeType>>;

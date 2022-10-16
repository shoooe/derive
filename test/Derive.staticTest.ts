import { assertEqual, describe } from '.';
import {
  Derive,
  ExcludeDecorations,
  Infer,
  ResolveRootFieldType
} from '../src/Derive';

describe('ExcludeDecorations', [
  // Simple scalar example
  assertEqual<ExcludeDecorations<number>, number>(),

  // Some other object type
  assertEqual<ExcludeDecorations<Map<string, number>>, Map<string, number>>(),

  // Scalar nullability
  assertEqual<ExcludeDecorations<number | null>, number>(),
  assertEqual<ExcludeDecorations<number | undefined>, number>(),
  assertEqual<ExcludeDecorations<number | null | undefined>, number>(),

  // Arrays
  assertEqual<ExcludeDecorations<Array<number>>, number>(),

  // Arrays nullability
  assertEqual<ExcludeDecorations<Array<number> | null>, number>(),
  assertEqual<ExcludeDecorations<Array<number> | undefined>, number>(),
  assertEqual<ExcludeDecorations<Array<number> | null | undefined>, number>()
]);

describe('ResolveRootFieldType', [
  // Nullable infer
  assertEqual<ResolveRootFieldType<undefined, Infer>, undefined>(),
  assertEqual<ResolveRootFieldType<null, Infer>, null>(),

  // Base infer examples
  assertEqual<ResolveRootFieldType<number, Infer>, number>(),
  assertEqual<ResolveRootFieldType<number | null, Infer>, number | null>(),
  assertEqual<
    ResolveRootFieldType<number | undefined, Infer>,
    number | undefined
  >(),
  assertEqual<
    ResolveRootFieldType<number | null | undefined, Infer>,
    number | null | undefined
  >(),

  // Weird scenario where the shape type takes precedence (never actually
  // happens because shapes don't allow specific types for known properties).
  assertEqual<ResolveRootFieldType<number, string>, string>(),

  // Lens modifications
  assertEqual<ResolveRootFieldType<number, Infer | null>, number | null>(),
  assertEqual<
    ResolveRootFieldType<number, Infer | undefined>,
    number | undefined
  >(),
  assertEqual<
    ResolveRootFieldType<number, Infer | null | undefined>,
    number | null | undefined
  >()
]);

// Test data (with recursive & mutually recursive types)
type User = {
  bestFriend: User | undefined;
  favoriteBook: Book | null;
  friends: User[];
  id: number;
  manager: User;
  name: string;
  parents: User[] | null;
};

type Book = {
  author: User;
  isdn: number;
  reviewer: User | undefined;
  synopsis: string | null;
  title: string | null | undefined;
};

describe('Derive', [
  // Scalars
  assertEqual<
    Derive<User, { id: Infer; name: Infer }>,
    { id: number; name: string }
  >(),
  assertEqual<
    Derive<Book, { title: Infer }>,
    { title: string | null | undefined }
  >(),
  assertEqual<Derive<Book, { synopsis: Infer }>, { synopsis: string | null }>(),

  // Objects
  assertEqual<
    Derive<User, { manager: { id: Infer } }>,
    { manager: { id: number } }
  >(),
  assertEqual<
    Derive<User, { bestFriend: { id: Infer } }>,
    { bestFriend: { id: number } | undefined }
  >(),

  // Arrays
  assertEqual<
    Derive<User, { friends: { id: Infer } }>,
    { friends: { id: number }[] }
  >(),
  assertEqual<
    Derive<User, { parents: { id: Infer } }>,
    { parents: { id: number }[] | null }
  >(),

  // Recursion
  assertEqual<
    Derive<User, { parents: { manager: { id: Infer } } }>,
    { parents: { manager: { id: number } }[] | null }
  >(),

  // Mutual recursion
  assertEqual<
    Derive<User, { favoriteBook: { author: { id: Infer } } }>,
    { favoriteBook: { author: { id: number } } | null }
  >(),

  // Infer modifications
  assertEqual<
    Derive<Book, { synopsis: Infer | null }>,
    { synopsis: string | null }
  >(),
  assertEqual<
    Derive<Book, { synopsis: Infer | undefined }>,
    { synopsis: string | null | undefined }
  >(),

  // Custom properties
  assertEqual<
    Derive<Book, { isActive: boolean; synopsis: Infer }>,
    { isActive: boolean; synopsis: string | null }
  >(),

  // Supports aliases
  assertEqual<
    Derive<Book, { isdn: Infer; someAlias: Book['isdn'] }>,
    { isdn: number; someAlias: number }
  >(),
  assertEqual<
    Derive<Book, { isdn: Infer; someAlias: Book['isdn'] | null }>,
    { isdn: number; someAlias: number | null }
  >()
]);

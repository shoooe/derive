import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { Derive } from '../src/Derive';
import { Auto } from '../src/Auto';
import { Alias } from '../src/Alias';
import { assertCompilationError } from '../utils/assertCompilationError';

// Test data (with recursive & mutually recursive types)
type User = {
  bestFriend: User | undefined;
  favoriteBook: Book | null;
  friends: User[];
  id: number;
  manager: User;
  name: string;
  parents: User[] | null;
  note?: string;
  editorNote?: string | null;
};

type Book = {
  author: User;
  isdn: number;
  reviewer: User | undefined;
  synopsis: string | null;
  title: string | null | undefined;
};

test('Derive', [
  // Simple types
  // assertEqualTypes<Derive<number>, number>(),
  assertEqualTypes<Derive<number, Auto>, number>(),
  assertEqualTypes<Derive<number, Auto | null>, number | null>(),

  // Compilation errors
  assertCompilationError<
    Derive<
      { nested: { id: string } },
      // @ts-expect-error: Expecting an error here because `Auto` cannot be used for nested objects
      { nested: Auto }
    >
  >(),
  assertCompilationError<
    Derive<
      { nested: { id: string } },
      // @ts-expect-error: `Auto` cannot be used for objects
      { nested: Auto }
    >
  >(),
  assertCompilationError<
    Derive<
      { id: string },
      // @ts-expect-error: Nested objects cannot be used for non-objects
      {
        id: { prop: number };
      }
    >
  >(),
  assertCompilationError<
    Derive<
      { nested: { id: string } },
      // @ts-expect-error: Cannot use `Auto` for object
      Auto
    >
  >(),

  // Scalars
  assertEqualTypes<
    Derive<User, { id: Auto; name: Auto }>,
    { id: number; name: string }
  >(),
  assertEqualTypes<
    Derive<Book, { title: Auto }>,
    { title: string | null | undefined }
  >(),
  assertEqualTypes<
    Derive<Book, { synopsis: Auto }>,
    { synopsis: string | null }
  >(),
  assertEqualTypes<
    Derive<User, { note: Auto }>,
    { note?: string | undefined }
  >(),
  assertEqualTypes<
    Derive<User, { editorNote: Auto }>,
    { editorNote?: string | null }
  >(),

  // Objects
  assertEqualTypes<
    Derive<User, { manager: { id: Auto } }>,
    { manager: { id: number } }
  >(),
  assertEqualTypes<
    Derive<User, { bestFriend: { id: Auto } }>,
    { bestFriend: { id: number } | undefined }
  >(),

  // Arrays
  assertEqualTypes<
    Derive<User, { friends: { id: Auto } }>,
    { friends: { id: number }[] }
  >(),
  assertEqualTypes<
    Derive<User, { parents: { id: Auto } }>,
    { parents: { id: number }[] | null }
  >(),

  // Recursion
  assertEqualTypes<
    Derive<User, { parents: { manager: { id: Auto } } }>,
    { parents: { manager: { id: number } }[] | null }
  >(),

  // Mutual recursion
  assertEqualTypes<
    Derive<User, { favoriteBook: { author: { id: Auto } } }>,
    { favoriteBook: { author: { id: number } } | null }
  >(),

  // Auto modifications
  assertEqualTypes<
    Derive<Book, { synopsis: Auto | null }>,
    { synopsis: string | null }
  >(),
  assertEqualTypes<
    Derive<Book, { synopsis: Auto | undefined }>,
    { synopsis: string | null | undefined }
  >(),

  // Custom properties
  assertEqualTypes<
    Derive<Book, { isActive: boolean; synopsis: Auto }>,
    { isActive: boolean; synopsis: string | null }
  >(),
  assertEqualTypes<
    Derive<Book, { isActive?: boolean; synopsis: Auto }>,
    { isActive?: boolean; synopsis: string | null }
  >(),

  // Supports nested derives
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Derive<Book['isdn'], Auto> }>,
    { isdn: number; someAlias: number }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Derive<User['note'], Auto> }>,
    { isdn: number; someAlias: string | undefined }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Derive<Book['isdn'], Auto | null> }>,
    { isdn: number; someAlias: number | null }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Derive<Book['isdn'], Auto> | null }>,
    { isdn: number; someAlias: number | null }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias?: Derive<Book['isdn'], Auto | null> }>,
    { isdn: number; someAlias?: number | null }
  >(),
  assertEqualTypes<
    Derive<
      Book,
      {
        isdn: Auto;
        someAlias?: Derive<Book['author'], { id: Auto; note: Auto }>;
      }
    >,
    {
      isdn: number;
      someAlias?:
        | {
            id: number;
            note?: string | undefined;
          }
        | undefined;
    }
  >(),

  // Supports aliases
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Alias<Book, 'isdn', Auto> }>,
    { isdn: number; someAlias: number }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Alias<User, 'note', Auto> }>,
    { isdn: number; someAlias?: string | undefined }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Alias<Book, 'isdn', Auto | null> }>,
    { isdn: number; someAlias: number | null }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias: Alias<Book, 'isdn', Auto> | null }>,
    { isdn: number; someAlias: number | null }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Auto; someAlias?: Alias<Book, 'isdn', Auto | null> }>,
    { isdn: number; someAlias?: number | null }
  >(),
  assertEqualTypes<
    Derive<
      Book,
      {
        isdn: Auto;
        someAlias?: Alias<
          Book,
          'author',
          { id: Auto; note: Auto; someOtherAlias: Alias<User, 'name', Auto> }
        >;
      }
    >,
    {
      isdn: number;
      someAlias?:
        | {
            id: number;
            note?: string | undefined;
            someOtherAlias: string;
          }
        | undefined;
    }
  >(),
]);

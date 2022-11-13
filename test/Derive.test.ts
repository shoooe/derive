import { assertEqualTypes } from '../utils/assertEqualTypes';
import { describe } from '../utils/describe';
import { it } from '../utils/it';
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

describe('Derive', [
  it('simply resolves the original type with scalars and `Auto`', [
    assertEqualTypes<Derive<number, Auto>, number>(),
    assertEqualTypes<Derive<number | null, Auto>, number | null>(),
    assertEqualTypes<Derive<number | undefined, Auto>, number | undefined>(),
    assertEqualTypes<
      Derive<number | null | undefined, Auto>,
      number | null | undefined
    >(),
  ]),

  it("doesn't allow `Auto` for object like types", [
    assertCompilationError<
      Derive<
        { nested: { id: string } },
        // @ts-expect-error: error
        { nested: Auto }
      >
    >(),
  ]),

  it("doesn't allow nested shapes for scalar types", [
    assertCompilationError<
      Derive<
        { id: string },
        // @ts-expect-error: error
        {
          id: { prop: Auto };
        }
      >
    >(),
  ]),

  it('supports scalars', [
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
  ]),

  it('supports records', [
    assertEqualTypes<
      Derive<User, { manager: { id: Auto } }>,
      { manager: { id: number } }
    >(),
    assertEqualTypes<
      Derive<User, { bestFriend: { id: Auto } }>,
      { bestFriend: { id: number } | undefined }
    >(),
  ]),

  it('supports arrays', [
    assertEqualTypes<
      Derive<User, { friends: { id: Auto } }>,
      { friends: { id: number }[] }
    >(),
    assertEqualTypes<
      Derive<User, { parents: { id: Auto } }>,
      { parents: { id: number }[] | null }
    >(),
  ]),

  it('supports recursive types', [
    assertEqualTypes<
      Derive<User, { parents: { manager: { id: Auto } } }>,
      { parents: { manager: { id: number } }[] | null }
    >(),
  ]),

  it('supports mutually recursive types', [
    assertEqualTypes<
      Derive<User, { favoriteBook: { author: { id: Auto } } }>,
      { favoriteBook: { author: { id: number } } | null }
    >(),
  ]),

  it('supports aliases', [
    assertEqualTypes<
      Derive<Book, { isdn: Auto; someAlias: Alias<Book, 'isdn', Auto> }>,
      { isdn: number; someAlias: number }
    >(),
  ]),
  it('supports aliases that override existing fields', [
    assertEqualTypes<
      Derive<Book, { isdn: Auto; author: Alias<Book, 'isdn', Auto> }>,
      { isdn: number; author: number }
    >(),
  ]),
  it('infers optionality for fields with aliases', [
    assertEqualTypes<
      Derive<Book, { isdn: Auto; someAlias: Alias<User, 'note', Auto> }>,
      { isdn: number; someAlias?: string | undefined }
    >(),
  ]),
  it('supports nested aliases', [
    assertEqualTypes<
      Derive<
        Book,
        {
          isdn: Auto;
          someAlias: Alias<
            Book,
            'author',
            { id: Auto; note: Auto; someOtherAlias: Alias<User, 'name', Auto> }
          >;
        }
      >,
      {
        isdn: number;
        someAlias: {
          id: number;
          note?: string | undefined;
          someOtherAlias: string;
        };
      }
    >(),
  ]),
]);

import { assertEqualTypes } from '../utils/assert-equal-types';
import { describe } from '../utils/describe';
import { it } from '../utils/it';
import { Derive } from '../src/derive';

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
  it('resolves scalars', [
    assertEqualTypes<Derive<number, true>, number>(),
    assertEqualTypes<Derive<number | null, true>, number | null>(),
    assertEqualTypes<Derive<number | undefined, true>, number | undefined>(),
    assertEqualTypes<
      Derive<number | null | undefined, true>,
      number | null | undefined
    >(),
  ]),

  it('supports scalars', [
    assertEqualTypes<
      Derive<User, { id: true; name: true }>,
      { id: number; name: string }
    >(),
    assertEqualTypes<
      Derive<Book, { title: true }>,
      { title: string | null | undefined }
    >(),
    assertEqualTypes<
      Derive<Book, { synopsis: true }>,
      { synopsis: string | null }
    >(),
    assertEqualTypes<
      Derive<User, { note: true }>,
      { note?: string | undefined }
    >(),
    assertEqualTypes<
      Derive<User, { editorNote: true }>,
      { editorNote?: string | null }
    >(),
  ]),

  it('supports records', [
    assertEqualTypes<
      Derive<User, { manager: { id: true } }>,
      { manager: { id: number } }
    >(),
    assertEqualTypes<
      Derive<User, { bestFriend: { id: true } }>,
      { bestFriend: { id: number } | undefined }
    >(),
  ]),

  it('supports arrays', [
    assertEqualTypes<
      Derive<User, { friends: { id: true } }>,
      { friends: { id: number }[] }
    >(),
    assertEqualTypes<
      Derive<User, { parents: { id: true } }>,
      { parents: { id: number }[] | null }
    >(),
  ]),

  it('supports recursive types', [
    assertEqualTypes<
      Derive<User, { parents: { manager: { id: true } } }>,
      { parents: { manager: { id: number } }[] | null }
    >(),
  ]),

  it('supports mutually recursive types', [
    assertEqualTypes<
      Derive<User, { favoriteBook: { author: { id: true } } }>,
      { favoriteBook: { author: { id: number } } | null }
    >(),
  ]),
]);

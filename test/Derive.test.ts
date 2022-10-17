import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import type { Derive } from '../src/Derive';
import type { Infer } from '../src/Infer';

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

test('Derive', [
  // Scalars
  assertEqualTypes<
    Derive<User, { id: Infer; name: Infer }>,
    { id: number; name: string }
  >(),
  assertEqualTypes<
    Derive<Book, { title: Infer }>,
    { title: string | null | undefined }
  >(),
  assertEqualTypes<
    Derive<Book, { synopsis: Infer }>,
    { synopsis: string | null }
  >(),

  // Objects
  assertEqualTypes<
    Derive<User, { manager: { id: Infer } }>,
    { manager: { id: number } }
  >(),
  assertEqualTypes<
    Derive<User, { bestFriend: { id: Infer } }>,
    { bestFriend: { id: number } | undefined }
  >(),

  // Arrays
  assertEqualTypes<
    Derive<User, { friends: { id: Infer } }>,
    { friends: { id: number }[] }
  >(),
  assertEqualTypes<
    Derive<User, { parents: { id: Infer } }>,
    { parents: { id: number }[] | null }
  >(),

  // Recursion
  assertEqualTypes<
    Derive<User, { parents: { manager: { id: Infer } } }>,
    { parents: { manager: { id: number } }[] | null }
  >(),

  // Mutual recursion
  assertEqualTypes<
    Derive<User, { favoriteBook: { author: { id: Infer } } }>,
    { favoriteBook: { author: { id: number } } | null }
  >(),

  // Infer modifications
  assertEqualTypes<
    Derive<Book, { synopsis: Infer | null }>,
    { synopsis: string | null }
  >(),
  assertEqualTypes<
    Derive<Book, { synopsis: Infer | undefined }>,
    { synopsis: string | null | undefined }
  >(),

  // Custom properties
  assertEqualTypes<
    Derive<Book, { isActive: boolean; synopsis: Infer }>,
    { isActive: boolean; synopsis: string | null }
  >(),

  // Supports aliases
  assertEqualTypes<
    Derive<Book, { isdn: Infer; someAlias: Book['isdn'] }>,
    { isdn: number; someAlias: number }
  >(),
  assertEqualTypes<
    Derive<Book, { isdn: Infer; someAlias: Book['isdn'] | null }>,
    { isdn: number; someAlias: number | null }
  >()
]);

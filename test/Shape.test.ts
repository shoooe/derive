import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { Shape } from '../src/Shape';
import { Auto } from '../src/Auto';
import { Derive } from '../src/Derive';
import { Alias } from '../src/Alias';
import { assertCompilationError } from '../utils/assertCompilationError';

type User = {
  id: number;
  name: string;
  bestFriend: User | undefined;
  friends: User[] | null;
};

type UserDetails = Shape<
  User,
  {
    id: Auto;
    name: Auto;
  }
>;

type UserExtra = Shape<User, { id: Auto; isActive?: boolean }>;

type UserWithFriends = Shape<
  User,
  {
    id: Auto;
    bestFriend: UserDetails;
    friends: UserDetails & UserExtra;
  }
>;

type ShapeWithNoCommonFields = Shape<User, { isActive: boolean }>;

type ShapeWithOnlyAliases = Shape<User, { alias: Alias<User, 'name', Auto> }>;

test('Shape', [
  // Compilation errors
  assertCompilationError<
    Shape<
      { nested: { id: string } },
      // @ts-expect-error: Expecting an error here because `Auto` cannot be used for nested objects
      { nested: Auto }
    >
  >(),
  assertCompilationError<
    Shape<
      { nested: { id: string } },
      // @ts-expect-error: `Auto` cannot be used for objects
      { nested: Auto }
    >
  >(),
  assertCompilationError<
    Shape<
      { id: string },
      // @ts-expect-error: Nested objects cannot be used for non-objects
      {
        id: { prop: number };
      }
    >
  >(),
  assertCompilationError<
    Shape<
      { id: string },
      // @ts-expect-error: Cannot use arrays with `Auto`
      Auto[]
    >
  >(),

  // Shapes & shapes composition
  assertEqualTypes<Derive<User, UserDetails>, { id: number; name: string }>(),
  assertEqualTypes<
    Derive<User, UserExtra>,
    { id: number; isActive?: boolean }
  >(),
  assertEqualTypes<
    Derive<User, UserDetails & UserExtra>,
    { id: number; name: string; isActive?: boolean }
  >(),
  assertEqualTypes<
    Derive<User, UserWithFriends>,
    {
      id: number;
      bestFriend: { id: number; name: string } | undefined;
      friends: { id: number; name: string; isActive?: boolean }[] | null;
    }
  >(),
  assertEqualTypes<
    Derive<User, ShapeWithNoCommonFields>,
    {
      isActive: boolean;
    }
  >(),
  assertEqualTypes<
    Derive<User, ShapeWithOnlyAliases>,
    {
      alias: string;
    }
  >(),
]);

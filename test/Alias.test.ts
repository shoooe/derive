import { assertEqualTypes } from '../utils/assertEqualTypes';
import { assertNonEqualTypes } from '../utils/assertNonEqualTypes';
import { test } from '../utils/test';
import { Alias } from '../src/Alias';
import { Auto } from '../src/Auto';
import { assertCompilationError } from '../utils/assertCompilationError';

type User = {
  id: number;
  name: string | null;
  bestFriend: User | null;
};

test('Alias', [
  assertNonEqualTypes<Alias<User, 'id', Auto>, Alias<User, 'name', Auto>>(),
  assertEqualTypes<Alias<User, 'name', Auto>, Alias<User, 'name', Auto>>(),
  // assertEqualTypes<Alias<User, 'name'>, Alias<User, 'name', Auto>>(),
  assertCompilationError<
    Alias<
      User,
      // @ts-expect-error: 'missing' is not a property of `User`
      'missing',
      Auto
    >
  >(),
  assertCompilationError<
    Alias<
      User,
      'bestFriend',
      // @ts-expect-error: `Auto` cannot be used for objects
      Auto
    >
  >(),
  assertCompilationError<
    Alias<
      User,
      'id',
      // @ts-expect-error: Nested objects cannot be used for non-objects
      {
        id: number;
      }
    >
  >(),
]);

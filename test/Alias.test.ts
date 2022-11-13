import { assertEqualTypes } from '../utils/assertEqualTypes';
import { assertNonEqualTypes } from '../utils/assertNonEqualTypes';
import { describe } from '../utils/describe';
import { Alias } from '../src/Alias';
import { Auto } from '../src/Auto';
import { assertCompilationError } from '../utils/assertCompilationError';
import { it } from '../utils/it';

type User = {
  id: number;
  name: string | null;
  bestFriend: User | null;
};

describe('Alias', [
  it('supports scalars', [
    assertNonEqualTypes<Alias<User, 'id', Auto>, Alias<User, 'name', Auto>>(),
    assertEqualTypes<Alias<User, 'name', Auto>, Alias<User, 'name', Auto>>(),
  ]),

  it('defaults to `Auto` for scalar types', [
    // assertEqualTypes<Alias<User, 'name'>, Alias<User, 'name', Auto>>(),
  ]),

  it("doesn't compile when you specify a key that doesn't exist", [
    assertCompilationError<
      Alias<
        User,
        // @ts-expect-error: error
        'missing',
        Auto
      >
    >(),
  ]),

  it("doesn't compile when you specify `Auto` for an object like type", [
    assertCompilationError<
      Alias<
        User,
        'bestFriend',
        // @ts-expect-error: error
        Auto
      >
    >(),
  ]),

  it("doesn't compile when you specify a nested shape for a scalar field", [
    assertCompilationError<
      Alias<
        User,
        'id',
        // @ts-expect-error: error
        {
          id: Auto;
        }
      >
    >(),
  ]),
]);

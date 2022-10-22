import { assertEqualTypes } from '../utils/assertEqualTypes';
import { assertNonEqualTypes } from '../utils/assertNonEqualTypes';
import { test } from '../utils/test';
import { Alias } from '../src/Alias';
import { Auto } from '../src/Auto';

type User = {
  id: number;
  name: string | null;
};

test('Alias', [
  assertNonEqualTypes<Alias<User, 'id', Auto>, Alias<User, 'name', Auto>>(),
  assertEqualTypes<Alias<User, 'name', Auto>, Alias<User, 'name', Auto>>(),
  assertEqualTypes<Alias<User, 'name', Auto>, Alias<User, 'name'>>(),
]);

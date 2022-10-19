import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ShapeFieldLike } from '../src/ShapeFieldLike';
import { Auto } from '../src/Auto';

test('ShapeFieldLike', [
  assertEqualTypes<
    ShapeFieldLike<{ id: number }, 'id'>,
    Auto | null | undefined
  >(),
  assertEqualTypes<
    ShapeFieldLike<{ name?: string | null }, 'name'>,
    Auto | null | undefined
  >(),
  assertEqualTypes<
    ShapeFieldLike<{ bestFriend: { id: number } }, 'bestFriend'>,
    {
      id?: Auto | null | undefined;
    }
  >(),
  assertEqualTypes<
    ShapeFieldLike<{ bestFriend?: { id: number } | undefined }, 'bestFriend'>,
    {
      id?: Auto | null | undefined;
    }
  >(),
]);

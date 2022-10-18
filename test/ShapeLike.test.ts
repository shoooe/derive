import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ShapeLike } from '../src/ShapeLike';
import { Auto } from '../src/Auto';

test('ShapeLike', [
  assertEqualTypes<
    ShapeLike<{ id: number }>,
    {
      id?: Auto | null | undefined;
    }
  >(),
  assertEqualTypes<
    ShapeLike<{ id: number; name?: string | null }>,
    {
      id?: Auto | null | undefined;
      name?: Auto | null | undefined;
    }
  >(),
]);

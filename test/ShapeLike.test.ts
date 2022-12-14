import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ShapeLike } from '../src/ShapeLike';
import { Auto } from '../src/Auto';

test('ShapeLike', [
  assertEqualTypes<ShapeLike<number>, Auto | null | undefined>(),
  assertEqualTypes<ShapeLike<string | null>, Auto | null | undefined>(),
  assertEqualTypes<
    ShapeLike<{ id: number }>,
    {
      id?: Auto | null | undefined;
    }
  >(),
  assertEqualTypes<
    ShapeLike<{ id: number | undefined }>,
    {
      id?: Auto | null | undefined;
    }
  >(),
]);

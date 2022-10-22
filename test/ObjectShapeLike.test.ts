import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ObjectShapeLike } from '../src/ObjectShapeLike';
import { Auto } from '../src/Auto';

test('ObjectShapeLike', [
  assertEqualTypes<
    ObjectShapeLike<{ id: number }>,
    {
      id?: Auto | null | undefined;
    }
  >(),
  assertEqualTypes<
    ObjectShapeLike<{ id: number; name?: string | null }>,
    {
      id?: Auto | null | undefined;
      name?: Auto | null | undefined;
    }
  >(),
]);

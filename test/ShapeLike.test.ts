import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ShapeLike } from '../src/ShapeLike';
import { Infer } from '../src/Infer';

test('ShapeLike', [
  assertEqualTypes<
    ShapeLike<{ id: number }>,
    {
      id?: Infer | null | undefined;
    }
  >(),
  assertEqualTypes<
    ShapeLike<{ id: number; name?: string | null }>,
    {
      id?: Infer | null | undefined;
      name?: Infer | null | undefined;
    }
  >(),
]);

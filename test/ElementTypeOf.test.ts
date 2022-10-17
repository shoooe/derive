import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ElementTypeOf } from '../src/ElementTypeOf';

test('ElementTypeOf', [
  assertEqualTypes<ElementTypeOf<number>, number>(),
  assertEqualTypes<ElementTypeOf<Array<number>>, number>(),
  assertEqualTypes<ElementTypeOf<number[]>, number>(),
  assertEqualTypes<ElementTypeOf<Array<number | null>>, number | null>(),
  assertEqualTypes<ElementTypeOf<Array<number> | null>, number | null>(),
]);

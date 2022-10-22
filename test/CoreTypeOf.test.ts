import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { CoreTypeOf } from '../src/CoreTypeOf';

test('CoreTypeOf', [
  // Simple scalar example
  assertEqualTypes<CoreTypeOf<number>, number>(),

  // Some other object type
  assertEqualTypes<CoreTypeOf<Map<string, number>>, Map<string, number>>(),

  // Scalar nullability
  assertEqualTypes<CoreTypeOf<number | null>, number>(),
  assertEqualTypes<CoreTypeOf<number | undefined>, number>(),
  assertEqualTypes<CoreTypeOf<number | null | undefined>, number>(),

  // Arrays
  assertEqualTypes<CoreTypeOf<Array<number>>, number>(),

  // Arrays nullability
  assertEqualTypes<CoreTypeOf<Array<number> | null>, number>(),
  assertEqualTypes<CoreTypeOf<Array<number> | undefined>, number>(),
  assertEqualTypes<CoreTypeOf<Array<number> | null | undefined>, number>(),
]);

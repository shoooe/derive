import { assertEqualTypes } from '../utils/assert-equal-types';
import { it } from '../utils/it';
import { describe } from '../utils/describe';
import { CoreTypeOf } from '../src/core-type-of';

describe('CoreTypeOf', [
  it('returns a simple scalar type', [
    assertEqualTypes<CoreTypeOf<number>, number>(),
  ]),

  it('supports complex types like `Map`', [
    assertEqualTypes<CoreTypeOf<Map<string, number>>, Map<string, number>>(),
  ]),

  it('strips out null and undefined', [
    assertEqualTypes<CoreTypeOf<number | null>, number>(),
    assertEqualTypes<CoreTypeOf<number | undefined>, number>(),
    assertEqualTypes<CoreTypeOf<number | null | undefined>, number>(),
  ]),

  it('strips out arrays', [
    assertEqualTypes<CoreTypeOf<Array<number>>, number>(),
  ]),

  it('both strips out null and undefined and arrays', [
    assertEqualTypes<CoreTypeOf<Array<number> | null>, number>(),
    assertEqualTypes<CoreTypeOf<Array<number> | undefined>, number>(),
    assertEqualTypes<CoreTypeOf<Array<number> | null | undefined>, number>(),
  ]),
]);

import { assertEqualTypes } from '../utils/assertEqualTypes';
import { ElementTypeOf } from '../src/ElementTypeOf';
import { describe } from '../utils/describe';
import { it } from '../utils/it';

describe('ElementTypeOf', [
  it('does nothing on non array types', [
    assertEqualTypes<ElementTypeOf<number>, number>(),
    assertEqualTypes<ElementTypeOf<number | null>, number | null>(),
  ]),

  it('returns the element type of an array', [
    assertEqualTypes<ElementTypeOf<Array<number>>, number>(),
    assertEqualTypes<ElementTypeOf<number[]>, number>(),
    assertEqualTypes<ElementTypeOf<Array<number | null>>, number | null>(),
    assertEqualTypes<ElementTypeOf<Array<number> | null>, number | null>(),
  ]),
]);

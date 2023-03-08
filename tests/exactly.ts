import { Exactly } from '../src/exactly';
import { assertEqualTypes } from '../utils/assert-equal-types';
import { describe } from '../utils/describe';
import { it } from '../utils/it';

type Extends<A, B> = A extends B ? true : false;

type RecordWithFields = { id: number; name: number | null };

describe('Exactly', [
  it('extends exact types', [
    assertEqualTypes<
      Extends<
        { id: number; name: number | null },
        Exactly<RecordWithFields, { id: number; name: number | null }>
      >,
      true
    >(),
  ]),
  it('extends if the type is a subset of the target', [
    assertEqualTypes<
      Extends<
        { id: number; name: number },
        Exactly<RecordWithFields, { id: number; name: number }>
      >,
      true
    >(),
  ]),
  it("doesn't extend if a field is missing", [
    assertEqualTypes<
      Extends<{ id: number }, Exactly<RecordWithFields, { id: number }>>,
      false
    >(),
  ]),
  it("doesn't extend if the type is a superset of the target", [
    assertEqualTypes<
      Extends<
        { id: number; name: number | 'extra' },
        Exactly<RecordWithFields, { id: number; name: number | 'extra' }>
      >,
      false
    >(),
  ]),
]);

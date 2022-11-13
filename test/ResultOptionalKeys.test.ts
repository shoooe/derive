import { assertEqualTypes } from '../utils/assertEqualTypes';
import { it } from '../utils/it';
import { ResultOptionalKeys } from '../src/ResultOptionalKeys';
import { Auto } from '../src/Auto';
import { Alias } from '../src/Alias';
import { describe } from '../utils/describe';

describe('ResultOptionalKeys', [
  it('returns never when there are no optional keys', [
    assertEqualTypes<
      ResultOptionalKeys<
        { id: number; test: string },
        { id: Auto; extra: number }
      >,
      never
    >(),
  ]),

  it('ignores keys that are not in the shape', [
    assertEqualTypes<
      ResultOptionalKeys<
        { id: number; test?: string },
        { id: Auto; extra: number }
      >,
      never
    >(),
  ]),

  it('ignores keys that are simply undefined in the shape', [
    assertEqualTypes<
      ResultOptionalKeys<
        { id: number; test?: string },
        { id: Auto; extra: number | undefined }
      >,
      never
    >(),
  ]),

  it('includes keys that are in the shape and are optional', [
    assertEqualTypes<
      ResultOptionalKeys<
        { id: number; test: string },
        { id: Auto; extra?: number }
      >,
      'extra'
    >(),
  ]),

  it(
    'includes keys that are optional in the base type and `Auto` in the shape type',
    [
      assertEqualTypes<
        ResultOptionalKeys<{ id?: number; test: string }, { id: Auto }>,
        'id'
      >(),
    ],
  ),

  it(
    'includes keys that are optional both in the base type and in the shape type',
    [
      assertEqualTypes<
        ResultOptionalKeys<{ id?: number; test: string }, { id?: Auto }>,
        'id'
      >(),
    ],
  ),

  it(
    'ignores keys that are not in the base type and are aliases of a required field',
    [
      assertEqualTypes<
        ResultOptionalKeys<
          { id: number; test?: string },
          { id: Auto; extra: Alias<{ required: number }, 'required', Auto> }
        >,
        never
      >(),
    ],
  ),

  it(
    'includes keys that are not in the base type and are aliases of an optional field',
    [
      assertEqualTypes<
        ResultOptionalKeys<
          { id: number; test?: string },
          { id: Auto; extra: Alias<{ optional?: number }, 'optional', Auto> }
        >,
        'extra'
      >(),
    ],
  ),
]);

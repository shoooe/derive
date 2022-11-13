import { assertEqualTypes } from '../utils/assertEqualTypes';
import { it } from '../utils/it';
import { ResultRequiredKeys } from '../src/ResultRequiredKeys';
import { Auto } from '../src/Auto';
import { Alias } from '../src/Alias';
import { describe } from '../utils/describe';

describe('ResultRequiredKeys', [
  it('includes all shape keys that are required', [
    assertEqualTypes<
      ResultRequiredKeys<
        { id: number; test: string },
        { id: Auto; extra: number }
      >,
      'id' | 'extra'
    >(),
  ]),

  it('ignores keys that are not in the shape', [
    assertEqualTypes<
      ResultRequiredKeys<
        { id: number; test?: string },
        { id: Auto; extra: number }
      >,
      'id' | 'extra'
    >(),
  ]),

  it('includes keys that are simply undefined in the shape', [
    assertEqualTypes<
      ResultRequiredKeys<
        { id: number; test?: string },
        { id: Auto; extra: number | undefined }
      >,
      'id' | 'extra'
    >(),
  ]),

  it('ignores keys that are in the shape and are optional', [
    assertEqualTypes<
      ResultRequiredKeys<
        { id: number; test: string },
        { id: Auto; extra?: number }
      >,
      'id'
    >(),
  ]),

  it(
    'ignores keys that are optional in the base type and `Auto` in the shape type',
    [
      assertEqualTypes<
        ResultRequiredKeys<{ id?: number; test: string }, { id: Auto }>,
        never
      >(),
    ],
  ),

  it(
    'ignores keys that are optional both in the base type and in the shape type',
    [
      assertEqualTypes<
        ResultRequiredKeys<{ id?: number; test: string }, { id?: Auto }>,
        never
      >(),
    ],
  ),

  it(
    'includes keys that are not in the base type and are aliases of a required field',
    [
      assertEqualTypes<
        ResultRequiredKeys<
          { id: number; test?: string },
          { id: Auto; extra: Alias<{ required: number }, 'required', Auto> }
        >,
        'id' | 'extra'
      >(),
    ],
  ),

  it(
    'ignores keys that are not in the base type and are aliases of an optional field',
    [
      assertEqualTypes<
        ResultRequiredKeys<
          { id: number; test?: string },
          { id: Auto; extra: Alias<{ optional?: number }, 'optional', Auto> }
        >,
        'id'
      >(),
    ],
  ),
]);

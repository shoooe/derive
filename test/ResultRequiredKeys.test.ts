import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ResultRequiredKeys } from '../src/ResultRequiredKeys';
import { Auto } from '../src/Auto';
import { Alias } from '../src/Alias';

test('ResultRequiredKeys', [
  // Includes all shape keys that are required.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test: string },
      { id: Auto; extra: number }
    >,
    'id' | 'extra'
  >(),

  // Ignores keys that are not in the shape.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test?: string },
      { id: Auto; extra: number }
    >,
    'id' | 'extra'
  >(),

  // Includes keys that are simply undefined in the shape.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test?: string },
      { id: Auto; extra: number | undefined }
    >,
    'id' | 'extra'
  >(),

  // Ignores keys that are in the shape and are optional.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test: string },
      { id: Auto; extra?: number }
    >,
    'id'
  >(),

  // Ignores keys that are optional in the base type and `Auto`
  // in the shape type.
  assertEqualTypes<
    ResultRequiredKeys<{ id?: number; test: string }, { id: Auto }>,
    never
  >(),

  // Ignores keys that are optional both in the base type and in
  // the shape type.
  assertEqualTypes<
    ResultRequiredKeys<{ id?: number; test: string }, { id?: Auto }>,
    never
  >(),

  // Includes keys that are not in the base type and are aliases of
  // a required field.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test?: string },
      { id: Auto; extra: Alias<{ required: number }, 'required'> }
    >,
    'id' | 'extra'
  >(),

  // Ignores keys that are not in the base type and are aliases of
  // an optional field.
  assertEqualTypes<
    ResultRequiredKeys<
      { id: number; test?: string },
      { id: Auto; extra: Alias<{ optional?: number }, 'optional'> }
    >,
    'id'
  >(),
]);

import { describe } from '../utils/describe';
import { it } from '../utils/it';
import { assertEqualTypes } from '../utils/assertEqualTypes';
import { Shape } from '../src/Shape';
import { assertCompilationError } from '../utils/assertCompilationError';
import { EmptyRecord } from '../src/EmptyRecord';

describe('Shape', [
  it('allows scalars as target types', [
    assertEqualTypes<Shape<number, true>, true>(),
  ]),
  it('allows empty records for record types', [
    assertEqualTypes<Shape<{ id: number }, EmptyRecord>, EmptyRecord>(),
  ]),
  it("doesn't allow using `true` for an object like field", [
    assertCompilationError<
      Shape<
        { nested: { id: string } },
        // @ts-expect-error: error
        { nested: true }
      >
    >(),
  ]),
  it("doesn't allow using other types other than the ones allowed", [
    assertCompilationError<
      Shape<
        { id: string },
        // @ts-expect-error: error
        { id: string }
      >
    >(),
    assertCompilationError<
      Shape<
        { id: string },
        // @ts-expect-error: error
        { extra: string }
      >
    >(),
  ]),
  it("doesn't allow optional `true`s", [
    assertCompilationError<
      Shape<
        { id: string },
        // @ts-expect-error: error
        { id?: true }
      >
    >(),
  ]),
  it("doesn't allow record-like shapes for scalars", [
    assertCompilationError<
      Shape<
        { id: string },
        // @ts-expect-error: error
        { id: { prop: number } }
      >
    >(),
  ]),
]);

import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ResolveType } from '../src/ResolveType';
import { Auto } from '../src/Auto';

test('ResolveType', [
  assertEqualTypes<ResolveType<number, Auto>, number>(),
  assertEqualTypes<ResolveType<number | null, Auto>, number | null>(),
  assertEqualTypes<ResolveType<number | undefined, Auto>, number | undefined>(),
  assertEqualTypes<
    ResolveType<number | null | undefined, Auto>,
    number | null | undefined
  >(),
  assertEqualTypes<ResolveType<number, Auto | null>, number | null>(),
  assertEqualTypes<ResolveType<number, Auto | undefined>, number | undefined>(),
  assertEqualTypes<
    ResolveType<number, Auto | null | undefined>,
    number | null | undefined
  >(),
  // Weird case that never happens in practice, but worth noticing that the shape
  // type (right hand side) take precedence.
  assertEqualTypes<ResolveType<number, string>, string>(),
]);

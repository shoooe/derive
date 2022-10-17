import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { ForceIntellisenseExpansion } from '../src/ForceIntellisenseExpansion';

test('ForceIntellisenseExpansion', [
  assertEqualTypes<ForceIntellisenseExpansion<number>, number>(),
  assertEqualTypes<ForceIntellisenseExpansion<number | null>, number | null>(),
  assertEqualTypes<
    ForceIntellisenseExpansion<{ id: number; name: string | null }>,
    { id: number; name: string | null }
  >(),
  assertEqualTypes<
    ForceIntellisenseExpansion<{ id: number; name: string | null } | undefined>,
    { id: number; name: string | null } | undefined
  >(),
]);

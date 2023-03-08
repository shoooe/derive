import { assertEqualTypes } from '../utils/assertEqualTypes';
import { describe } from '../utils/describe';
import { it } from '../utils/it';
import { ForceIntellisenseExpansion } from '../src/ForceIntellisenseExpansion';

describe('ForceIntellisenseExpansion', [
  it('should perform no modifications to the type', [
    assertEqualTypes<ForceIntellisenseExpansion<number>, number>(),
    assertEqualTypes<
      ForceIntellisenseExpansion<number | null>,
      number | null
    >(),
    assertEqualTypes<
      ForceIntellisenseExpansion<{ id: number; name: string | null }>,
      { id: number; name: string | null }
    >(),
    assertEqualTypes<
      ForceIntellisenseExpansion<
        { id: number; name: string | null } | undefined
      >,
      { id: number; name: string | null } | undefined
    >(),
  ]),
]);

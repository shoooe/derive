import { assertEqualTypes } from '../utils/assert-equal-types';
import { it } from '../utils/it';
import { RequiredKeysOf } from '../src/required-keys-of';
import { describe } from '../utils/describe';

type Mouse = {
  a: string;
  b: string | null;
  c: string | undefined;
  d: string | null | undefined;
  e?: string;
  f?: string | null;
  g?: string | null | undefined;
};

describe('RequiredKeysOf', [
  it('returns the required keys for the given type', [
    assertEqualTypes<RequiredKeysOf<Mouse>, 'a' | 'b' | 'c' | 'd'>(),
  ]),
]);

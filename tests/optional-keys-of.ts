import { assertEqualTypes } from '../utils/assert-equal-types';
import { OptionalKeysOf } from '../src/optional-keys-of';
import { describe } from '../utils/describe';
import { it } from '../utils/it';

type Mouse = {
  a: string;
  b: string | null;
  c: string | undefined;
  d: string | null | undefined;
  e?: string;
  f?: string | null;
  g?: string | null | undefined;
};

describe('OptionalKeysOf', [
  it('returns the optional keys for the given type', [
    assertEqualTypes<OptionalKeysOf<Mouse>, 'e' | 'f' | 'g'>(),
  ]),
]);

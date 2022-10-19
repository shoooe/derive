import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { RequiredKeysOf } from '../src/RequiredKeysOf';

type Mouse = {
  a: string;
  b: string | null;
  c: string | undefined;
  d: string | null | undefined;
  e?: string;
  f?: string | null;
  g?: string | null | undefined;
};

test('RequiredKeysOf', [
  assertEqualTypes<RequiredKeysOf<Mouse>, 'a' | 'b' | 'c' | 'd'>(),
]);

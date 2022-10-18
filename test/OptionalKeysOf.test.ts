import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { OptionalKeysOf } from '../src/OptionalKeysOf';

type Mouse = {
  a: string;
  b: string | null;
  c: string | undefined;
  d: string | null | undefined;
  e?: string;
  f?: string | null;
  g?: string | null | undefined;
};

test('OptionalKeysOf', [
  assertEqualTypes<OptionalKeysOf<Mouse>, 'e' | 'f' | 'g'>(),
]);

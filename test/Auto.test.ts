import { assertEqualTypes } from '../utils/assertEqualTypes';
import { assertNonEqualTypes } from '../utils/assertNonEqualTypes';
import { test } from '../utils/test';
import { Auto } from '../src/Auto';

export type AutoLike = typeof someSymbol;
declare const someSymbol: unique symbol;

test('Auto', [
  assertEqualTypes<Auto, Auto>(),
  assertNonEqualTypes<Auto, AutoLike>(),
]);

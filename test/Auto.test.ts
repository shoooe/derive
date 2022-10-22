import { assertEqualTypes } from '../utils/assertEqualTypes';
import { assertNonEqualTypes } from '../utils/assertNonEqualTypes';
import { test } from '../utils/test';
import { Auto } from '../src/Auto';

test('Auto', [
  assertEqualTypes<Auto, Auto>(),
  assertNonEqualTypes<Auto, Auto>(),
]);

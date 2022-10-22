import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { Auto } from '../src/Auto';

test('Auto', [assertEqualTypes<Auto, Auto>()]);

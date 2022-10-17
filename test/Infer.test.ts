import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { Infer } from '../src/Infer';

test('Infer', [assertEqualTypes<Infer, Infer>()]);

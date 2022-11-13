import { assertEqualTypes } from '../utils/assertEqualTypes';
import { describe } from '../utils/describe';
import { Auto } from '../src/Auto';
import { it } from '../utils/it';

describe('Auto', [it('is equal to itself', [assertEqualTypes<Auto, Auto>()])]);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteHelper } from '../src/AutocompleteHelper';
import { assertEqualTypes } from '../utils/assertEqualTypes';
import { describe } from '../utils/describe';
import { it } from '../utils/it';

describe('AutocompleteHelper', [
  it('supports scalar types', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number }>,
      { id?: true }
    >(),
  ]),

  it('ignores null and undefined', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number | undefined }>,
      { id?: true }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{ id: number | null }>,
      { id?: true }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{ id: number | null | undefined }>,
      { id?: true }
    >(),
  ]),

  it('ignores optionality', [
    assertEqualTypes<
      AutocompleteHelper<{ id?: number }>,
      { id?: true }
    >(),
  ]),

  it('supports nested records', [
    assertEqualTypes<
      AutocompleteHelper<{ friend: { name: string } }>,
      { friend?: { name?: true } }
    >(),
  ]),

  it('supports nested records with null or undefined', [
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | null;
      }>,
      { friend?: { name?: true } }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | undefined;
      }>,
      { friend?: { name?: true } }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | null | undefined;
      }>,
      { friend?: { name?: true } }
    >(),
  ]),

  it('supports scalar arrays', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number[] }>,
      { id?: true }
    >(),
  ]),

  it('supports unions', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number | string }>,
      { id?: true }
    >(),
  ]),

  it('supports arrays of records', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number; friend: { name: string }[] }>,
      {
        id?: true;
        friend?: { name?: true };
      }
    >(),
  ]),
]);

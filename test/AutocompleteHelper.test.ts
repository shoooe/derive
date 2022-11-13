/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alias } from '../src/Alias';
import { Auto } from '../src/Auto';
import { AutocompleteHelper } from '../src/AutocompleteHelper';
import { assertEqualTypes } from '../utils/assertEqualTypes';
import { describe } from '../utils/describe';
import { it } from '../utils/it';

type X = AutocompleteHelper<{ id: number }>;

describe('AutocompleteHelper', [
  it('supports scalar types', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
  ]),

  it('ignores null and undefined', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number | undefined }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{ id: number | null }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{ id: number | null | undefined }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
  ]),

  it('ignores optionality', [
    assertEqualTypes<
      AutocompleteHelper<{ id?: number }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
  ]),

  it('supports nested objects', [
    assertEqualTypes<
      AutocompleteHelper<{ friend: { name: string } }>,
      { friend?: { name?: Auto | Alias<any, any, any> } }
    >(),
  ]),

  it('supports nested objects with null or undefined', [
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | null;
      }>,
      { friend?: { name?: Auto | Alias<any, any, any> } }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | undefined;
      }>,
      { friend?: { name?: Auto | Alias<any, any, any> } }
    >(),
    assertEqualTypes<
      AutocompleteHelper<{
        friend: { name: string } | null | undefined;
      }>,
      { friend?: { name?: Auto | Alias<any, any, any> } }
    >(),
  ]),

  it('supports scalar arrays', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number[] }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
  ]),

  it('supports unions', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number | string }>,
      { id?: Auto | Alias<any, any, any> }
    >(),
  ]),

  it('supports object arrays', [
    assertEqualTypes<
      AutocompleteHelper<{ id: number; friend: { name: string }[] }>,
      {
        id?: Auto | Alias<any, any, any>;
        friend?: { name?: Auto | Alias<any, any, any> };
      }
    >(),
  ]),
]);

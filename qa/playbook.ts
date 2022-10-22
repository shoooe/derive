import { Alias } from '../src/Alias';
import { Auto } from '../src/Auto';
import { Derive } from '../src/Derive';
import { Shape } from '../src/Shape';

type User = {
  id: string;
  name?: string;
  bestFriend: User | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ShapeAutocomplete = Shape<
  User,
  {
    id: Auto;
    // CHECK: start typing "name" and notice the autocomplete
    // CHECK: start typing "bestFriend" and then "name" and notice the autocomplete for the nested type
  }
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeriveAutocomplete = Derive<
  User,
  {
    id: Auto;
    // CHECK: start typing "name" and notice the autocomplete
    // CHECK: start typing "bestFriend" and then "name" and notice the autocomplete for the nested type
  }
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AliasAutocomplete = Shape<
  User,
  {
    id: Auto;
    alias: Alias<User, 'id', Auto>; // CHECK: remove 'id' and notice the autocomplete for keys
    nestedAlias: Alias<
      User,
      'bestFriend',
      {
        id: Auto;
        // CHECK: start typing "name" and notice the autocomplete
      }
    >;
  }
>;

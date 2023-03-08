import { Derive } from '../src/derive';

type User = {
  id: string;
  name?: string;
  bestFriend: User | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeriveAutocomplete = Derive<
  User,
  {
    id: true;
    // CHECK: start typing "name" and notice the autocomplete
    // CHECK: start typing "bestFriend" and then "name" and notice the autocomplete for the nested type
  }
>;

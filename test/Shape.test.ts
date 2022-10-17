import { assertEqualTypes } from '../utils/assertEqualTypes';
import { test } from '../utils/test';
import { Shape } from '../src/Shape';
import { Infer } from '../src/Infer';
import { Derive } from '../src/Derive';

type User = {
  id: number;
  name: string;
  bestFriend: User | undefined;
  friends: User[] | null;
};

type UserDetails = Shape<
  User,
  {
    id: Infer;
    name: Infer;
  }
>;

type UserExtra = Shape<User, { id: Infer; isActive?: boolean }>;

type UserWithFriends = Shape<
  User,
  {
    id: Infer;
    bestFriend: UserDetails;
    friends: UserDetails & UserExtra;
  }
>;

test('Shape', [
  assertEqualTypes<Derive<User, UserDetails>, { id: number; name: string }>(),
  assertEqualTypes<
    Derive<User, UserExtra>,
    { id: number; isActive?: boolean }
  >(),
  assertEqualTypes<
    Derive<User, UserDetails & UserExtra>,
    { id: number; name: string; isActive?: boolean }
  >(),
  assertEqualTypes<
    Derive<User, UserWithFriends>,
    {
      id: number;
      bestFriend: { id: number; name: string } | undefined;
      friends: { id: number; name: string; isActive?: boolean }[] | null;
    }
  >(),
]);

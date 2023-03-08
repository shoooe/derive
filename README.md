# Derive

[![npm version](https://badge.fury.io/js/@shoooe%2Fderive.svg)](https://badge.fury.io/js/@shoooe%2Fderive)

Utility type to generate a type starting from another.

You can see this tool as an hardcode version of `Pick`.

Features:

- 😎 Type safe
- 🌱 Minimal & lightweight
- ⌨️​ Autocompletion for fields
- 👀 Preview expanded types in intellisense
- 💫 Supports recursive & mutually recursive types
- ❓ Optional fields support
- 💋 Inspired by GraphQL
- 🛠 Supports [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) types

## Installation

```
yarn add @shoooe/derive
```

## Usage

### Basic usage

Let's say that we have a type `User` defined as:

```typescript
type User = {
  bestFriend: User | undefined;
  favoriteBook: Book | null;
  friends: User[] | undefined;
  id: number;
  name: string;
};

type Book = {
  author: User;
  isdn: number;
  synopsis: string | null;
  title: string | null | undefined;
  subtitle?: string | null;
};
```

We can derive a subset of its properties via:

```typescript
type Result = Derive<
  User,
  {
    id: true;
    name: true;

    // Automatically expands nullable & optional types, which means that `null`
    // and `undefined` will be added automatically to the resulting type if
    // they existed in the target type.
    bestFriend: {
      name: true;
    };

    // Automatically expands arrays as well
    friends: {
      name: true;

      // Supports mutually recursive types
      favoriteBook: {
        isdn: true;
        title: true;
        synopsis: true;
        author: {
          name: true;
        };
      };
    };
  }
>;
```

Which will result in:

```typescript
type Result = {
  id: number;
  name: string;
  bestFriend:
    | {
        name: string;
      }
    | undefined;
  friends:
    | {
        name: string;
        favoriteBook: {
          isdn: number;
          title: string | null | undefined;
          synopsis: string | null;
          author: {
            name: string;
          };
        } | null;
      }[]
    | undefined;
};
```

## Credits

Special thanks to:

- [Perdoo](https://www.perdoo.com/) for sponsoring the initial research & implementation
- [Szaman](https://github.com/szamanr) for the initial code review

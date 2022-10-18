# Derive

[![npm version](https://badge.fury.io/js/@shoooe%2Fderive.svg)](https://badge.fury.io/js/@shoooe%2Fderive)

Utility type to generate a type starting from another.

Features:

- 😎 Type safe
- 🌱 Minimal & lightweight
- 👀 Preview expanded types in intellisense
- 💫 Supports recursive & mutually recursive types
- 💋 Built with GraphQL in mind
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
};
```

We can derive a subset of its properties (and extend them via):

```typescript
type Result = Derive<
  User,
  {
    // `Auto` = infer original type (`number`)
    id: Auto;

    // `Auto` = infer original type (`string`)
    name: Auto;

    // Automatically expands nullable & optional types, which means that `null`
    // and `undefined` will be added automatically to the resulting type if
    // they existed in the root type.
    bestFriend: {
      name: Auto;
    };

    // Automatically expands arrays as well
    friends: {
      name: Auto;
      isActive: boolean; // This is an extra field (not coming from the root type)
      favoriteBook: {
        // Supports mutually recursive types
        isdn: Auto;
        title: Auto;
        synopsis: Auto;
        author: {
          name: Auto;
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
        isActive: boolean;
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

### Reusing shapes

You can extract and reuse shapes:

```typescript
type CustomShape = Shape<
  User,
  {
    id: Auto;
    name: Auto;
    bestFriend: {
      name: Auto;
    };
  }
>;
```

Once defined you can use them directly to generate the type:

```typescript
type Result = Derive<User, CustomShape>;
```

Otherwise you can use them inside other shapes:

```typescript
type Result = Derive<
  User,
  {
    id: Auto;
    name: Auto;
    bestFriend: CustomShape;
  }
>;
```

## Credits

Special thanks to:

- [Perdoo](https://www.perdoo.com/) for sponsoring the initial research & implementation
- [The Guild](the-guild.dev) for building [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)

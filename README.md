# Derive

Utility type to generate a type starting from another.

<img src="./assets/images/example-usage.gif" alt="Example usage" />

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
    // `Infer` = infer original type (`number`)
    id: Infer;

    // `Infer` = infer original type (`string`)
    name: Infer;

    // Automatically expands nullable & optional types, which means that `null`
    // and `undefined` will be added automatically to the resulting type if
    // they existed in the root type.
    bestFriend: {
      name: Infer;
    };

    // Automatically expands arrays as well
    friends: {
      name: Infer;
      isActive: boolean; // This is an extra field (not coming from the root type)
      favoriteBook: {
        // Supports mutually recursive types
        isdn: Infer;
        title: Infer;
        synopsis: Infer;
        author: {
          name: Infer;
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
    id: Infer;
    name: Infer;
    bestFriend: {
      name: Infer;
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
    id: Infer;
    name: Infer;
    bestFriend: CustomShape;
  }
>;
```

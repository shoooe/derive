import { OptionalKeysOf } from './OptionalKeysOf';

export type RequiredKeysOf<T extends object> = Exclude<
  keyof T,
  OptionalKeysOf<T>
>;

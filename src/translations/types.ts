/**
 * The English dictionary is the canonical shape. The Amharic dictionary must
 * provide exactly the same keys, so a missing translation is a compile error.
 */
export type DeepString<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
    ? DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

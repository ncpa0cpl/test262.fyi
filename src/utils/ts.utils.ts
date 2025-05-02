export type Unpartial<O extends object> = {
  [K in keyof O]-?: Exclude<O[K], null | undefined>;
};

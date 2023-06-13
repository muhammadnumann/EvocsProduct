export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ArrayElement<ArrayT extends readonly unknown[]> =
  ArrayT extends readonly (infer ElementT)[] ? ElementT : never;

export const assertUnreachable = (_x: never): never => {
  throw new Error('this is not reachable');
};

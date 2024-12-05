import { ComposedFunctors, PipedFunctors } from './types';

// compose :: [(a -> b)] -> a -> b
export const compose: <T, K>(...fns: ComposedFunctors<T, K>) => (x: T) => K =
  (...fns) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x as any);

// pipe :: [(a -> b)] -> a -> b
export const pipe: <T, K>(...fns: PipedFunctors<T, K>) => (x: T) => K =
  (...fns) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x as any);

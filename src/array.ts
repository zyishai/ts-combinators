import { Functor } from './types';

// map :: (a -> b) -> [a] -> [b]
export const mapArr: <T, K>(f: Functor<T, K>) => (xs: T[]) => K[] = (f) => (xs) =>
  xs.map((item) => f(item));

// filter :: (a -> Bool) -> [a] -> [a]
export const filterArr: <T>(f: Functor<T, boolean>) => (xs: T[]) => T[] = (f) => (xs) =>
  xs.filter(f);

// reduce :: (a -> b -> a, a) -> [b] -> a
export const reduceArr: <T, K>(f: Functor<K, Functor<T, K>>, init: K) => (xs: T[]) => K =
  (f, init) => (xs) =>
    xs.reduce((acc, value) => f(acc)(value), init);

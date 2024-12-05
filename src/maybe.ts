import { Functor, Maybe } from './types';

// some :: (a -> b) -> Maybe a -> Maybe b
export const some: <T, K>(f: Functor<T, K>) => (m: Maybe<T>) => Maybe<K> = (f) => (m) =>
  m === null || typeof m === 'undefined' ? undefined : f(m);

// none :: (() -> a) -> Maybe a -> Maybe a
export const none: <T>(f: Functor<void, T>) => (m: Maybe<T>) => T = (f) => (m) =>
  m === null || typeof m === 'undefined' ? f() : m;

// empty :: () -> Maybe a
export const empty: <T>() => Maybe<T> = () => undefined;

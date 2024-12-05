import { Functor } from './types';

// map :: (b -> c) -> (a -> b) -> a -> c
export const map: <T, K, V>(f: Functor<K, V>) => (g: Functor<T, K>) => (x: T) => V =
  (f) => (g) => (x) =>
    f(g(x));

// contramap :: (a -> b) -> (b -> c) -> a -> c
export const contramap: <T, K>(f: Functor<T, K>) => <V>(g: Functor<K, V>) => (x: T) => V =
  (f) => (g) => (x) =>
    g(f(x));

// promap :: (a -> b) -> (c -> d) -> (b -> c) -> a -> d
export const promap: <T, K>(
  f: Functor<T, K>
) => <V, Q>(g: Functor<V, Q>) => (h: Functor<K, V>) => (x: T) => Q = (f) => (g) => (h) => (x) =>
  g(h(f(x)));

// ap :: (a -> b -> c) -> (a -> b) -> a -> c
export const ap: <T, K, V>(f: Functor<T, Functor<K, V>>) => (g: Functor<T, K>) => (x: T) => V =
  (f) => (g) => (x) =>
    f(x)(g(x));

// chain/flatMap :: (a -> b -> c) -> (b -> a) -> b -> c
export const flatMap: <T, K, V>(
  f: Functor<T, Functor<K, V>>
) => (g: Functor<K, T>) => (x: K) => V = (f) => (g) => (x) => f(g(x))(x);
export const chain = flatMap;

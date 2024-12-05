import { Functor } from './types';

// identity :: x -> x
export const identity: <T>(x: T) => T = (x) => x;

// tap :: (a -> b) -> a -> a
export const tap: <T>(f: Functor<T, any>) => (x: T) => T = (f) => (x) => (f(x), x);

import { Functor } from './types';

// promise :: (a -> b) -> Promise a -> Promise b
export const promise: <T, R>(f: Functor<T, R>) => (p: Promise<T>) => Promise<R> = (f) => (p) =>
  p.then(f);

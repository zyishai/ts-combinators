import { identity } from './atoms';
import { Functor } from './types';

// io :: (a -> ... -> c -> r) -> a -> ... -> c -> () -> r
// @ts-expect-error foo
export const io: <T, R>(f: Functor<T, R>, size?: number) => IO<typeof f> = (f, size = 1) => {
  // @ts-expect-error foo
  function unityFn(args: any[], arg: any) {
    if (typeof arg === 'undefined' || args.length >= size) {
      return args.reduce((fn, arg) => fn(arg), f);
    } else {
      return unityFn.bind(unityFn, [...args, arg]);
    }
  }

  return unityFn.bind(unityFn, []);
};

// constant :: a -> () -> a
export const constant: <T, K = void>(_: T) => Functor<K, T> = io(identity) as any;

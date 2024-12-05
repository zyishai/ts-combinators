import { compose } from './compose';
import { constant } from './io';
import { none, some } from './maybe';
import { Either, Functor, Maybe } from './types';

// either :: (x -> a) -> (() -> b) -> x -> Either b a
export const either =
  <R, X>(f: Functor<X, Maybe<R>>) =>
  <L>(g: Functor<void, L>) =>
  (x: X) =>
    (() =>
      compose(
        none(() => [g(), undefined]),
        some((r) => [undefined, r]),
        f
      )(x)) as Either<L, R>;

// orDefault :: (x -> a, b) -> x -> Either b a
export const orDefault = <R, L, X>(f: Functor<X, Maybe<R>>, defaultValue: L) =>
  either(f)(constant(defaultValue));

// orElse :: (x -> a, () -> b) -> x -> Either b a
export const orElse = <R, L, X>(f: Functor<X, Maybe<R>>, elseFn: Functor<void, L>) =>
  either(f)(elseFn);

// right :: (a -> c) -> Either b a -> Either b c
export const right =
  <R, NR>(f: Functor<R, NR>) =>
  <L>(e: Either<L, R>) =>
    compose(([l, r]: [L, R]) => [l, some(f)(r)], e) as Either<L, NR>;

// left :: (b -> d) -> Either b a -> Either d a
export const left =
  <L, NL>(g: Functor<L, NL>) =>
  <R>(e: Either<L, R>) =>
    compose(([l, r]: [L, R]) => [some(g)(l), r], e) as Either<NL, R>;

// extract :: Either b a -> a | b
export const extract = <L, R>(e: Either<L, R>) => {
  const [l, r] = e();
  return r ?? l;
};

// chainRight :: (a -> Either d c) -> Either b a -> Either d c
export const chainRight =
  <R, NR, NL>(f: Functor<R, Either<NL, NR>>) =>
  <L>(e: Either<L, R>) =>
    compose(
      ([l, r]: [L, R]) => some(compose((e: Either<NL, NR>) => e(), f))(r) ?? [l, undefined],
      e
    ) as Either<NL, NR>;

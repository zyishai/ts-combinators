export type Functor<T, K> = (x: T) => K;

// -----

export type ComposedFunctors<A, B> =
  | [Functor<A, B>]
  | [Functor<any, B>, ...Functor<any, any>[], Functor<A, any>];

export type PipedFunctors<A, B> =
  | [Functor<A, B>]
  | [Functor<A, any>, ...Functor<any, any>[], Functor<any, B>];

// -----

export type Empty = null | undefined | void | never;
export type NonEmpty<T> = T extends Empty ? never : T;
export type Maybe<T> = T | Empty;

// -----

export type Either<L, R> = () => [L, undefined] | [undefined, R];

// -----

type CParams<FN extends (x: any) => any, P extends any[] = []> = FN extends (x: infer T) => infer R
  ? R extends (x: any) => any
    ? CParams<R, [...P, T]>
    : [...P, T]
  : never;
type CReturnType<FN extends (x: any) => any> = FN extends (x: any) => infer R
  ? R extends (x: any) => any
    ? CReturnType<R>
    : R
  : FN;
export type IO<F extends Functor<any, any>, P extends any[] = CParams<F>> = P extends [
  infer T,
  ...infer Rest,
]
  ? (_: T) => IO<F, Rest>
  : Functor<void, CReturnType<F>>;

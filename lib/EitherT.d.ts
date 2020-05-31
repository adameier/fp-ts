/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Apply, Apply1, Apply2 } from './Apply'
import { Chain, Chain1, Chain2 } from './Chain'
import * as E from './Either'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
/**
 * @since 2.0.0
 */
export interface EitherT<M, E, A> extends HKT<M, E.Either<E, A>> {}
/**
 * @since 2.0.0
 */
export declare type EitherT1<M extends URIS, E, A> = Kind<M, E.Either<E, A>>
/**
 * @since 2.0.0
 */
export declare type EitherT2<M extends URIS2, R, E, A> = Kind2<M, R, E.Either<E, A>>
/**
 * @since 3.0.0
 */
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: EitherT2<F, R, E, A>) => EitherT2<F, R, E, B>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: EitherT1<F, E, A>) => EitherT1<F, E, B>
export declare function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: EitherT<F, E, A>) => EitherT<F, E, B>
/**
 * @since 3.0.0
 */
export declare function ap<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(fa: EitherT2<F, R, E, A>) => <B>(fab: EitherT2<F, R, E, (a: A) => B>) => EitherT2<F, R, E, B>
export declare function ap<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: EitherT1<F, E, A>) => <B>(fab: EitherT1<F, E, (a: A) => B>) => EitherT1<F, E, B>
export declare function ap<F>(
  F: Apply<F>
): <E, A>(fa: EitherT<F, E, A>) => <B>(fab: EitherT<F, E, (a: A) => B>) => EitherT<F, E, B>
/**
 * @since 3.0.0
 */
export declare function right<F extends URIS2>(A: Applicative2<F>): <R, E, A>(a: A) => EitherT2<F, R, E, A>
export declare function right<F extends URIS>(A: Applicative1<F>): <E, A>(a: A) => EitherT1<F, E, A>
export declare function right<F>(A: Applicative<F>): <E, A>(a: A) => EitherT<F, E, A>
/**
 * @since 3.0.0
 */
export declare function left<F extends URIS2>(A: Applicative2<F>): <R, E, A>(e: E) => EitherT2<F, R, E, A>
export declare function left<F extends URIS>(A: Applicative1<F>): <E, A>(e: E) => EitherT1<F, E, A>
export declare function left<F>(A: Applicative<F>): <E, A>(e: E) => EitherT<F, E, A>
/**
 * @since 3.0.0
 */
export declare function chain<F extends URIS2>(
  M: Monad2<F>
): <A, R, E, B>(f: (a: A) => EitherT2<F, R, E, B>) => (fa: EitherT2<F, R, E, A>) => EitherT2<F, R, E, B>
export declare function chain<F extends URIS>(
  M: Monad1<F>
): <A, E, B>(f: (a: A) => EitherT1<F, E, B>) => (fa: EitherT1<F, E, A>) => EitherT1<F, E, B>
export declare function chain<F>(
  M: Monad<F>
): <A, E, B>(f: (a: A) => EitherT<F, E, B>) => (fa: EitherT<F, E, A>) => EitherT<F, E, B>
/**
 * @since 3.0.0
 */
export declare function alt<M extends URIS2>(
  M: Monad2<M>
): <R, E, A>(that: () => EitherT2<M, R, E, A>) => (fa: EitherT2<M, R, E, A>) => EitherT2<M, R, E, A>
export declare function alt<M extends URIS>(
  M: Monad1<M>
): <E, A>(that: () => EitherT1<M, E, A>) => (fa: EitherT1<M, E, A>) => EitherT1<M, E, A>
export declare function alt<M>(
  M: Monad<M>
): <E, A>(that: () => EitherT<M, E, A>) => (fa: EitherT<M, E, A>) => EitherT<M, E, A>
/**
 * @since 3.0.0
 */
export declare function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: EitherT2<F, R, E, A>) => EitherT2<F, R, G, B>
export declare function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT1<F, E, A>) => EitherT1<F, G, B>
export declare function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: EitherT<F, E, A>) => EitherT<F, G, B>
/**
 * @since 3.0.0
 */
export declare function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <R, A>(fea: EitherT2<F, R, E, A>) => EitherT2<F, R, G, A>
export declare function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: EitherT1<F, E, A>) => EitherT1<F, G, A>
export declare function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: EitherT<F, E, A>) => EitherT<F, G, A>
/**
 * @since 3.0.0
 */
export declare function fold<M extends URIS2>(
  M: Chain2<M>
): <E, B, R, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>
) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, B>
export declare function fold<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: EitherT1<M, E, A>) => Kind<M, B>
export declare function fold<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: EitherT<M, E, A>) => HKT<M, B>
/**
 * @since 3.0.0
 */
export declare function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, R, A>(onLeft: (e: E) => Kind2<M, R, A>) => (ma: EitherT2<M, R, E, A>) => Kind2<M, R, A>
export declare function getOrElse<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: EitherT1<M, E, A>) => Kind<M, A>
export declare function getOrElse<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: EitherT<M, E, A>) => HKT<M, A>
/**
 * @since 3.0.0
 */
export declare function orElse<M extends URIS2>(
  M: Monad2<M>
): <E, R, N, A>(onLeft: (e: E) => EitherT2<M, R, N, A>) => (ma: EitherT2<M, R, E, A>) => EitherT2<M, R, N, A>
export declare function orElse<M extends URIS>(
  M: Monad1<M>
): <E, N, A>(onLeft: (e: E) => EitherT1<M, N, A>) => (ma: EitherT1<M, E, A>) => EitherT1<M, N, A>
export declare function orElse<M>(
  M: Monad<M>
): <E, N, A>(onLeft: (e: E) => EitherT<M, N, A>) => (ma: EitherT<M, E, A>) => EitherT<M, N, A>

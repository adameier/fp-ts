/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Apply, Apply1, Apply2 } from './Apply'
import { Chain, Chain1, Chain2 } from './Chain'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import * as O from './Option'
/**
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, O.Option<A>> {}
/**
 * @since 2.0.0
 */
export declare type OptionT1<M extends URIS, A> = Kind<M, O.Option<A>>
/**
 * @since 2.0.0
 */
export declare type OptionT2<M extends URIS2, E, A> = Kind2<M, E, O.Option<A>>
/**
 * @since 3.0.0
 */
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <E>(fa: OptionT2<F, E, A>) => OptionT2<F, E, B>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: OptionT1<F, A>) => OptionT1<F, B>
export declare function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: OptionT<F, A>) => OptionT<F, B>
/**
 * @since 3.0.0
 */
export declare function ap<F extends URIS2>(
  F: Apply2<F>
): <E, A>(fa: OptionT2<F, E, A>) => <B>(fab: OptionT2<F, E, (a: A) => B>) => OptionT2<F, E, B>
export declare function ap<F extends URIS>(
  F: Apply1<F>
): <A>(fa: OptionT1<F, A>) => <B>(fab: OptionT1<F, (a: A) => B>) => OptionT1<F, B>
export declare function ap<F>(F: Apply<F>): <A>(fa: OptionT<F, A>) => <B>(fab: OptionT<F, (a: A) => B>) => OptionT<F, B>
/**
 * @since 3.0.0
 */
export declare function some<F extends URIS2>(A: Applicative2<F>): <E, A>(a: A) => OptionT2<F, E, A>
export declare function some<F extends URIS>(A: Applicative1<F>): <A>(a: A) => OptionT1<F, A>
export declare function some<F>(A: Applicative<F>): <A>(a: A) => OptionT<F, A>
/**
 * @since 3.0.0
 */
export declare function chain<F extends URIS2>(
  M: Monad2<F>
): <A, E, B>(f: (a: A) => OptionT2<F, E, B>) => (fa: OptionT2<F, E, A>) => OptionT2<F, E, B>
export declare function chain<F extends URIS>(
  M: Monad1<F>
): <A, B>(f: (a: A) => OptionT1<F, B>) => (fa: OptionT1<F, A>) => OptionT1<F, B>
export declare function chain<F>(
  M: Monad<F>
): <A, B>(f: (a: A) => OptionT<F, B>) => (fa: OptionT<F, A>) => OptionT<F, B>
/**
 * @since 3.0.0
 */
export declare function alt<M extends URIS2>(
  M: Monad2<M>
): <E, A>(that: () => OptionT2<M, E, A>) => (fa: OptionT2<M, E, A>) => OptionT2<M, E, A>
export declare function alt<M extends URIS>(
  M: Monad1<M>
): <A>(that: () => OptionT1<M, A>) => (fa: OptionT1<M, A>) => OptionT1<M, A>
export declare function alt<M>(M: Monad<M>): <A>(that: () => OptionT<M, A>) => (fa: OptionT<M, A>) => OptionT<M, A>
/**
 * @since 3.0.0
 */
export declare function fold<M extends URIS2>(
  M: Chain2<M>
): <E, R, A>(
  onNone: () => Kind2<M, E, R>,
  onSome: (a: A) => Kind2<M, E, R>
) => (ma: OptionT2<M, E, A>) => Kind2<M, E, R>
export declare function fold<M extends URIS>(
  M: Chain1<M>
): <R, A>(onNone: () => Kind<M, R>, onSome: (a: A) => Kind<M, R>) => (ma: OptionT1<M, A>) => Kind<M, R>
export declare function fold<M>(
  M: Chain<M>
): <R, A>(onNone: () => HKT<M, R>, onSome: (a: A) => HKT<M, R>) => (ma: OptionT<M, A>) => HKT<M, R>
/**
 * @since 3.0.0
 */
export declare function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, A>(onNone: () => Kind2<M, E, A>) => (ma: OptionT2<M, E, A>) => Kind2<M, E, A>
export declare function getOrElse<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: () => Kind<M, A>) => (ma: OptionT1<M, A>) => Kind<M, A>
export declare function getOrElse<M>(M: Monad<M>): <A>(onNone: () => HKT<M, A>) => (ma: OptionT<M, A>) => HKT<M, A>

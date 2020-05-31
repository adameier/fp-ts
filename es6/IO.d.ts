import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Functor1 } from './Functor'
import { Apply1 } from './Apply'
import { Applicative1 } from './Applicative'
/**
 * @since 2.0.0
 */
export declare const URI = 'IO'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IO<A>
  }
}
/**
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}
/**
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
/**
 * @since 2.0.0
 */
export declare const of: <A>(a: A) => IO<A>
/**
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
/**
 * @since 3.0.0
 */
export declare const functorIO: Functor1<URI>
/**
 * @since 2.0.0
 */
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
/**
 * @since 3.0.0
 */
export declare const applyIO: Apply1<URI>
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
/**
 * @since 3.0.0
 */
export declare const applicativeIO: Applicative1<URI>
/**
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
/**
 * @since 3.0.0
 */
export declare const monadIO: Monad1<URI>
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
/**
 * @since 3.0.0
 */
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
/**
 * @since 3.0.0
 */
export declare const monadIOIO: MonadIO1<URI>

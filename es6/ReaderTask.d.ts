/**
 * @since 2.3.0
 */
import { Applicative2 } from './Applicative'
import { Apply2 } from './Apply'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import * as R from './Reader'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import Reader = R.Reader
import Task = T.Task
/**
 * @since 2.3.0
 */
export declare const URI = 'ReaderTask'
/**
 * @since 2.3.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderTask<E, A>
  }
}
/**
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
/**
 * @since 2.3.0
 */
export declare const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const of: <R, A>(a: A) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
/**
 * @since 2.3.0
 */
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
/**
 * @since 2.3.0
 */
export declare const ask: <R>() => ReaderTask<R, R>
/**
 * @since 2.3.0
 */
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
/**
 * @since 2.4.0
 */
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @since 2.4.0
 */
export declare const chainTaskK: <A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.3.0
 */
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
/**
 * @since 2.3.0
 */
export declare const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const apSecond: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.3.0
 */
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 2.3.0
 */
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
/**
 * @since 2.3.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @since 3.0.0
 */
export declare const functorReaderTask: Functor2<URI>
/**
 * @since 3.0.0
 */
export declare const applyReaderTask: Apply2<URI>
/**
 * @category instances
 * @since 3.0.0
 */
export declare const applicativeReaderTaskPar: Applicative2<URI>
/**
 * @category instances
 * @since 3.0.0
 */
export declare const applicativeReaderTaskSeq: Applicative2<URI>
/**
 * @since 3.0.0
 */
export declare const monadReaderTask: Monad2<URI>
/**
 * @since 3.0.0
 */
export declare const monadIOReaderTask: MonadIO2<URI>
/**
 * @since 3.0.0
 */
export declare const monadTaskReaderTask: MonadTask2<URI>

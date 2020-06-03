/**
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 *
 * @since 2.0.0
 */
import { Applicative1 } from './Applicative';
import { Apply1 } from './Apply';
import { Functor1 } from './Functor';
import { IO } from './IO';
import { Monad1 } from './Monad';
import { MonadIO1 } from './MonadIO';
import { MonadTask1 } from './MonadTask';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
/**
 * @since 2.0.0
 */
export declare const URI = "Task";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: Task<A>;
    }
}
/**
 * @since 2.0.0
 */
export interface Task<A> {
    (): Promise<A>;
}
/**
 * @since 2.0.0
 */
export declare function delay(millis: number): <A>(ma: Task<A>) => Task<A>;
/**
 * @since 2.0.0
 */
export declare function fromIO<A>(ma: IO<A>): Task<A>;
/**
 * @since 2.4.0
 */
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B>;
/**
 * @since 2.0.0
 */
export declare const never: Task<never>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>>;
/**
 * Note: uses `Promise.race` internally
 *
 * @since 2.0.0
 */
export declare function getRaceMonoid<A = never>(): Monoid<Task<A>>;
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>;
/**
 * @since 3.0.0
 */
export declare const functorTask: Functor1<URI>;
/**
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>;
/**
 * @since 3.0.0
 */
export declare const applyTask: Apply1<URI>;
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>;
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>;
/**
 * @since 2.0.0
 */
export declare function of<A>(a: A): Task<A>;
/**
 * @since 3.0.0
 */
export declare const applicativeTask: Applicative1<URI>;
/**
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>;
/**
 * @since 3.0.0
 */
export declare const monadTask: Monad1<URI>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>;
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>;
/**
 * @since 2.4.0
 */
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B>;
/**
 * @since 3.0.0
 */
export declare const monadIOTask: MonadIO1<URI>;
/**
 * @since 3.0.0
 */
export declare const monadTaskTask: MonadTask1<URI>;
/**
 * TODO
 * @since 3.0.0
 */
export declare const monadTaskSeq: Monad1<URI>;

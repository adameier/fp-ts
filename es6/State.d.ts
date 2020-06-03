/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative';
import { Apply2 } from './Apply';
import { Functor2 } from './Functor';
import { Monad2 } from './Monad';
/**
 * @since 2.0.0
 */
export declare const URI = "State";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind2<E, A> {
        readonly [URI]: State<E, A>;
    }
}
/**
 * @since 2.0.0
 */
export interface State<S, A> {
    (s: S): readonly [A, S];
}
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 3.0.0
 */
export declare const evaluate: <S>(s: S) => <A>(ma: State<S, A>) => A;
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 3.0.0
 */
export declare const execute: <S>(s: S) => <A>(ma: State<S, A>) => S;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S>() => State<S, S>;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S>(s: S) => State<S, void>;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => State<S, void>;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>;
/**
 * @since 2.0.0
 */
export declare const of: <S, A>(a: A) => State<S, A>;
/**
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>;
/**
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>;
/**
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>;
/**
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>;
/**
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A>;
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>;
/**
 * @since 3.0.0
 */
export declare const functorState: Functor2<URI>;
/**
 * @since 3.0.0
 */
export declare const applyState: Apply2<URI>;
/**
 * @since 3.0.0
 */
export declare const applicativeState: Applicative2<URI>;
/**
 * @since 3.0.0
 */
export declare const monadState: Monad2<URI>;

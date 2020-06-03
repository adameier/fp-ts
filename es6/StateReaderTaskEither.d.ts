/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt';
import { Applicative4 } from './Applicative';
import { Apply4 } from './Apply';
import { Bifunctor4 } from './Bifunctor';
import { Either } from './Either';
import { Predicate, Refinement } from './function';
import { Functor4 } from './Functor';
import { IO } from './IO';
import { IOEither } from './IOEither';
import { Monad4 } from './Monad';
import { MonadIO4 } from './MonadIO';
import { MonadTask4 } from './MonadTask';
import { MonadThrow4 } from './MonadThrow';
import { Option } from './Option';
import { Reader } from './Reader';
import { ReaderEither } from './ReaderEither';
import * as RTE from './ReaderTaskEither';
import { State } from './State';
import { Task } from './Task';
import { TaskEither } from './TaskEither';
import ReaderTaskEither = RTE.ReaderTaskEither;
/**
 * @since 2.0.0
 */
export declare const URI = "StateReaderTaskEither";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind4<S, R, E, A> {
        readonly [URI]: StateReaderTaskEither<S, R, E, A>;
    }
}
/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
    (s: S): ReaderTaskEither<R, E, readonly [A, S]>;
}
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export declare const evaluate: <S>(s: S) => <R = unknown, E = never, A = never>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A>;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export declare const execute: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S>;
/**
 * @since 2.0.0
 */
export declare function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S>;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void>;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IOEither<E, B>): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function chainIOEitherK<E, A, B>(f: (a: A) => IOEither<E, B>): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => TaskEither<E, B>): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function chainTaskEitherK<E, A, B>(f: (a: A) => TaskEither<E, B>): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => ReaderTaskEither<R, E, B>): <S>(...a: A) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.4.0
 */
export declare function chainReaderTaskEitherK<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.6.2
 */
export declare const alt: <S, R, E, A>(that: () => StateReaderTaskEither<S, R, E, A>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const ap: <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.0.0
 */
export declare const apFirst: <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const apSecond: <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.6.2
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>;
/**
 * @since 2.0.0
 */
export declare const chain: <S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.6.0
 */
export declare const chainW: <S, Q, D, A, B>(f: (a: A) => StateReaderTaskEither<S, Q, D, B>) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R & Q, E | D, B>;
/**
 * @since 2.6.1
 */
export declare const chainEitherKW: <D, A, B>(f: (a: A) => Either<D, B>) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B>;
/**
 * @since 2.6.1
 */
export declare const chainTaskEitherKW: <D, A, B>(f: (a: A) => TaskEither<D, B>) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B>;
/**
 * @since 2.6.1
 */
export declare const chainReaderTaskEitherKW: <R, D, A, B>(f: (a: A) => ReaderTaskEither<R, D, B>) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B>;
/**
 * @since 2.6.1
 */
export declare const chainIOEitherKW: <R, D, A, B>(f: (a: A) => IOEither<D, B>) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B>;
/**
 * @since 2.0.0
 */
export declare const flatten: <S, R, E, A>(mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
/**
 * @since 2.6.2
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>;
/**
 * @since 2.0.0
 */
export declare const fromEither: <S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: () => E) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * @since 2.4.4
 */
export declare const fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, B>;
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>;
};
/**
 * @since 2.4.4
 */
export declare const filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>;
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>;
};
/**
 * @since 3.0.0
 */
export declare const functorStateReaderTaskEither: Functor4<URI>;
/**
 * @since 3.0.0
 */
export declare const applyStateReaderTaskEither: Apply4<URI>;
/**
 * @since 3.0.0
 */
export declare const applicativeStateReaderTaskEither: Applicative4<URI>;
/**
 * @since 3.0.0
 */
export declare const monadStateReaderTaskEither: Monad4<URI>;
/**
 * @since 3.0.0
 */
export declare const bifunctorStateReaderTaskEither: Bifunctor4<URI>;
/**
 * @since 3.0.0
 */
export declare const altStateReaderTaskEither: Alt4<URI>;
/**
 * @since 3.0.0
 */
export declare const monadIOStateReaderTaskEither: MonadIO4<URI>;
/**
 * @since 3.0.0
 */
export declare const monadTaskStateReaderTaskEither: MonadTask4<URI>;
/**
 * @since 3.0.0
 */
export declare const monadThrowStateReaderTaskEither: MonadThrow4<URI>;
/**
 * TODO
 * @since 3.0.0
 */
export declare const monadReaderTaskEitherSeq: Monad4<URI> & Bifunctor4<URI> & Alt4<URI> & MonadTask4<URI> & MonadThrow4<URI>;

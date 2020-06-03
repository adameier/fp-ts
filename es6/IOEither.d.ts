/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt';
import { Applicative2, Applicative2C } from './Applicative';
import { Apply2 } from './Apply';
import { Bifunctor2 } from './Bifunctor';
import * as E from './Either';
import { Filterable2C } from './Filterable';
import { Lazy, Predicate, Refinement } from './function';
import { Functor2 } from './Functor';
import * as I from './IO';
import { Monad2 } from './Monad';
import { MonadIO2 } from './MonadIO';
import { MonadThrow2 } from './MonadThrow';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
import Either = E.Either;
import IO = I.IO;
/**
 * @since 2.0.0
 */
export declare const URI = "IOEither";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind2<E, A> {
        readonly [URI]: IOEither<E, A>;
    }
}
/**
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {
}
/**
 * @since 2.0.0
 */
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const fold: <E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B>;
/**
 * @since 2.0.0
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A>;
/**
 * @since 2.6.0
 */
export declare const getOrElseW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B>;
/**
 * @since 2.0.0
 */
export declare const orElse: <E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A>;
/**
 * @since 2.0.0
 */
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>>;
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A>;
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export declare function bracket<E, A, B>(acquire: IOEither<E, A>, use: (a: A) => IOEither<E, B>, release: (a: A, e: Either<E, B>) => IOEither<E, void>): IOEither<E, B>;
/**
 * @since 3.0.0
 */
export declare function getIOValidationApplicative<E>(S: Semigroup<E>): Applicative2C<URI, E>;
/**
 * @since 3.0.0
 */
export declare function getIOValidationAlt<E>(S: Semigroup<E>): Alt2C<URI, E>;
/**
 * @since 2.1.0
 */
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>;
/**
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>): (...a: A) => IOEither<E, B>;
/**
 * @since 2.4.0
 */
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B>;
/**
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>;
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>;
};
/**
 * @since 2.0.0
 */
export declare const filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>;
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>;
};
/**
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>;
/**
 * @since 3.0.0
 */
export declare const functorIOEither: Functor2<URI>;
/**
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>;
/**
 * @since 3.0.0
 */
export declare const applyIOEither: Apply2<URI>;
/**
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>;
/**
 * @since 3.0.0
 */
export declare const of: <E = never, A = never>(a: A) => IOEither<E, A>;
/**
 * @since 3.0.0
 */
export declare const applicativeIOEither: Applicative2<URI>;
/**
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>;
/**
 * @since 3.0.0
 */
export declare const monadIOEither: Monad2<URI>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>;
/**
 * @since 2.6.0
 */
export declare const chainW: <D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B>;
/**
 * @since 2.6.1
 */
export declare const chainEitherKW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B>;
/**
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>;
/**
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>;
/**
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>;
/**
 * @since 3.0.0
 */
export declare const bifunctorIOEither: Bifunctor2<URI>;
/**
 * @since 2.0.0
 */
export declare const alt: <E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A>;
/**
 * @since 3.0.0
 */
export declare const altIOEither: Alt2<URI>;
/**
 * @since 3.0.0
 */
export declare const monadIOIOEither: MonadIO2<URI>;
/**
 * @since 3.0.0
 */
export declare const monadThrowIOEither: MonadThrow2<URI>;

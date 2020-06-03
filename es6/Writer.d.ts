/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
/**
 * @since 2.0.0
 */
export declare const URI = "Writer";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind2<E, A> {
        readonly [URI]: Writer<E, A>;
    }
}
/**
 * @since 2.0.0
 */
export interface Writer<W, A> {
    (): readonly [A, W];
}
/**
 * @since 2.0.0
 */
export declare const evaluate: <W, A>(fa: Writer<W, A>) => A;
/**
 * @since 2.0.0
 */
export declare const execute: <W, A>(fa: Writer<W, A>) => W;
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export declare const tell: <W>(w: W) => Writer<W, void>;
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export declare const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]>;
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export declare const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A>;
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export declare const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]>;
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export declare const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A>;
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>;
/**
 * @since 3.0.0
 */
export declare const functorWriter: Functor2<URI>;
/**
 * @since 2.0.0
 */
export declare function getMonad<W>(M: Monoid<W>): Monad2C<URI, W>;

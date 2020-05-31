/**
 * @since 2.0.0
 */
import { Comonad2C } from './Comonad'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
/**
 * @since 2.0.0
 */
export declare const URI = 'Traced'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Traced<E, A>
  }
}
/**
 * @since 2.0.0
 */
export interface Traced<P, A> {
  (p: P): A
}
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export declare function tracks<P, A>(M: Monoid<P>, f: (a: A) => P): (wa: Traced<P, A>) => A
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export declare function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]>
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export declare function listens<P, B>(f: (p: P) => B): <A>(wa: Traced<P, A>) => Traced<P, [A, B]>
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export declare function censor<P>(f: (p: P) => P): <A>(wa: Traced<P, A>) => Traced<P, A>
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B>
/**
 * @since 3.0.0
 */
export declare const functorTraced: Functor2<URI>
/**
 * @since 2.0.0
 */
export declare function getComonad<P>(M: Monoid<P>): Comonad2C<URI, P>

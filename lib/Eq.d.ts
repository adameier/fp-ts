/**
 * The `Eq` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `E.equals(a, a) === true`
 * 2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
 * 3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`
 *
 * @since 2.0.0
 */
import { Contravariant1 } from './Contravariant';
import { Monoid } from './Monoid';
import { ReadonlyRecord } from './ReadonlyRecord';
/**
 * @since 2.0.0
 */
export declare const URI = "Eq";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: Eq<A>;
    }
}
/**
 * @since 2.0.0
 */
export interface Eq<A> {
    readonly equals: (x: A, y: A) => boolean;
}
/**
 * @since 2.0.0
 */
export declare function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A>;
/**
 * @since 2.5.0
 */
export declare const eqStrict: Eq<unknown>;
/**
 * @since 2.0.0
 */
export declare const eqString: Eq<string>;
/**
 * @since 2.0.0
 */
export declare const eqNumber: Eq<number>;
/**
 * @since 2.0.0
 */
export declare const eqBoolean: Eq<boolean>;
/**
 * @since 2.0.0
 */
export declare function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: {
    [K in keyof O]: Eq<O[K]>;
}): Eq<O>;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/lib/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 2.0.0
 */
export declare function getTupleEq<T extends ReadonlyArray<Eq<any>>>(...eqs: T): Eq<{
    [K in keyof T]: T[K] extends Eq<infer A> ? A : never;
}>;
/**
 * @since 2.6.0
 */
export declare function getMonoid<A>(): Monoid<Eq<A>>;
/**
 * @since 2.0.0
 */
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>;
/**
 * @since 3.0.0
 */
export declare const contravariantEq: Contravariant1<URI>;

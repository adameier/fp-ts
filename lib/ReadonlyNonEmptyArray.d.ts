/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.5.0
 */
import { Alt1 } from './Alt';
import { Comonad1 } from './Comonad';
import { Eq } from './Eq';
import { FoldableWithIndex1 } from './FoldableWithIndex';
import { Predicate, Refinement } from './function';
import { FunctorWithIndex1 } from './FunctorWithIndex';
import { Monad1 } from './Monad';
import { Option } from './Option';
import { Ord } from './Ord';
import { ReadonlyRecord } from './ReadonlyRecord';
import { Semigroup } from './Semigroup';
import { Show } from './Show';
import { TraversableWithIndex1 } from './TraversableWithIndex';
import { Traversable1 } from './Traversable';
import { Foldable1 } from './Foldable';
import { Functor1 } from './Functor';
import { Apply1 } from './Apply';
import { Applicative1 } from './Applicative';
import { Extend1 } from './Extend';
/**
 * @since 2.5.0
 */
export declare const URI = "ReadonlyNonEmptyArray";
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: ReadonlyNonEmptyArray<A>;
    }
}
/**
 * @since 2.5.0
 */
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
    readonly 0: A;
}
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export declare const cons: <A>(head: A, tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export declare const snoc: <A>(init: ReadonlyArray<A>, end: A) => ReadonlyNonEmptyArray<A>;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
export declare function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function fromArray<A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function head<A>(nea: ReadonlyNonEmptyArray<A>): A;
/**
 * @since 2.5.0
 */
export declare function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>;
/**
 * @since 2.5.0
 */
export declare const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A;
/**
 * @since 2.5.0
 */
export declare function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
export declare function getSemigroup<A = never>(): Semigroup<ReadonlyNonEmptyArray<A>>;
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>;
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.5.0
 */
export declare function group<A>(E: Eq<A>): {
    (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>;
    (as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>;
};
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
export declare function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>>;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
export declare function groupBy<A>(f: (a: A) => string): (as: ReadonlyArray<A>) => ReadonlyRecord<string, ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function last<A>(nea: ReadonlyNonEmptyArray<A>): A;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export declare function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>;
/**
 * @since 2.5.0
 */
export declare function sort<A>(O: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare function insertAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function updateAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function modifyAt<A>(i: number, f: (a: A) => A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
export declare function filter<A>(predicate: Predicate<A>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare function filterWithIndex<A>(predicate: (i: number, a: A) => boolean): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare const of: <A>(a: A) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>;
export declare function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare function fold<A>(S: Semigroup<A>): (fa: ReadonlyNonEmptyArray<A>) => A;
/**
 * @since 2.5.1
 */
export declare const zipWith: <A, B, C>(fa: ReadonlyNonEmptyArray<A>, fb: ReadonlyNonEmptyArray<B>, f: (a: A, b: B) => C) => ReadonlyNonEmptyArray<C>;
/**
 * @since 2.5.1
 */
export declare const zip: <A, B>(fa: ReadonlyNonEmptyArray<A>, fb: ReadonlyNonEmptyArray<B>) => ReadonlyNonEmptyArray<readonly [A, B]>;
/**
 * @since 2.5.1
 */
export declare const unzip: <A, B>(as: ReadonlyNonEmptyArray<readonly [A, B]>) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>];
/**
 * @since 2.5.0
 */
export declare const foldMapWithIndex: <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S;
/**
 * @since 2.5.0
 */
export declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S;
/**
 * @since 2.6.2
 */
export declare const alt: <A>(that: () => ReadonlyNonEmptyArray<A>) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare const ap: <A>(fa: ReadonlyNonEmptyArray<A>) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const apFirst: <B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare const apSecond: <B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const chain: <A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>;
/**
 * @since 2.5.0
 */
export declare const extend: <A, B>(f: (fa: ReadonlyNonEmptyArray<A>) => B) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>;
/**
 * @since 2.5.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>;
/**
 * @since 2.5.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B;
/**
 * @since 2.5.0
 */
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B;
/**
 * @since 2.5.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B;
/**
 * @since 2.5.0
 */
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B;
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable1<URI>['traverse'];
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable1<URI>['sequence'];
/**
 * @since 3.0.0
 */
export declare const traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'];
/**
 * @since 3.0.0
 */
export declare const functorReadonlyNonEmptyArray: Functor1<URI>;
/**
 * @since 3.0.0
 */
export declare const functorWithIndexReadonlyNonEmptyArray: FunctorWithIndex1<URI, number>;
/**
 * @since 3.0.0
 */
export declare const applyReadonlyNonEmptyArray: Apply1<URI>;
/**
 * @since 3.0.0
 */
export declare const applicativeReadonlyNonEmptyArray: Applicative1<URI>;
/**
 * @since 3.0.0
 */
export declare const monadReadonlyNonEmptyArray: Monad1<URI>;
/**
 * @since 3.0.0
 */
export declare const foldableReadonlyNonEmptyArray: Foldable1<URI>;
/**
 * @since 3.0.0
 */
export declare const foldableWithIndexReadonlyNonEmptyArray: FoldableWithIndex1<URI, number>;
/**
 * @since 3.0.0
 */
export declare const altReadonlyNonEmptyArray: Alt1<URI>;
/**
 * @since 3.0.0
 */
export declare const traversableReadonlyNonEmptyArray: Traversable1<URI>;
/**
 * @since 3.0.0
 */
export declare const traversableWithIndexReadonlyNonEmptyArray: TraversableWithIndex1<URI, number>;
/**
 * @since 3.0.0
 */
export declare const extendReadonlyNonEmptyArray: Extend1<URI>;
/**
 * @since 3.0.0
 */
export declare const extract: <A>(wa: ReadonlyNonEmptyArray<A>) => A;
/**
 * @since 3.0.0
 */
export declare const comonadReadonlyNonEmptyArray: Comonad1<URI>;

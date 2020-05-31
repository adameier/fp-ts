/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative1 } from './Applicative'
import { Apply1 } from './Apply'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement } from './function'
import { Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
/**
 * @since 2.0.0
 */
export declare const URI = 'NonEmptyArray'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: NonEmptyArray<A>
  }
}
/**
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A>
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A>
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export declare const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const head: <A>(nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const tail: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @since 2.0.0
 */
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export declare const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>>
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>>
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
export declare function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export declare const groupSort: <A>(O: Ord<A>) => (as: Array<A>) => Array<NonEmptyArray<A>>
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export declare const groupBy: <A>(f: (a: A) => string) => (as: Array<A>) => Record<string, NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const last: <A>(nea: NonEmptyArray<A>) => A
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export declare const init: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @since 2.0.0
 */
export declare const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const insertAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const updateAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const of: <A>(a: A) => NonEmptyArray<A>
/**
 * @since 2.2.0
 */
export declare function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export declare function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A
/**
 * @since 2.5.1
 */
export declare const zipWith: <A, B, C>(
  fa: NonEmptyArray<A>,
  fb: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C>
/**
 * @since 2.5.1
 */
export declare const zip: <A, B>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>) => NonEmptyArray<[A, B]>
/**
 * @since 2.5.1
 */
export declare const unzip: <A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>]
/**
 * @since 2.0.0
 */
export declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
/**
 * @since 2.0.0
 */
export declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
/**
 * @since 2.6.2
 */
export declare const alt: <A>(that: () => NonEmptyArray<A>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @since 2.0.0
 */
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @since 2.0.0
 */
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable1<URI>['traverse']
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable1<URI>['sequence']
/**
 * @since 3.0.0
 */
export declare const traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex']
/**
 * @since 3.0.0
 */
export declare const functorNonEmptyArray: Functor1<URI>
/**
 * @since 3.0.0
 */
export declare const functorWithIndexNonEmptyArray: FunctorWithIndex1<URI, number>
/**
 * @since 3.0.0
 */
export declare const applyNonEmptyArray: Apply1<URI>
/**
 * @since 3.0.0
 */
export declare const applicativeNonEmptyArray: Applicative1<URI>
/**
 * @since 3.0.0
 */
export declare const monadNonEmptyArray: Monad1<URI>
/**
 * @since 3.0.0
 */
export declare const foldableNonEmptyArray: Foldable1<URI>
/**
 * @since 3.0.0
 */
export declare const foldableWithIndexNonEmptyArray: FoldableWithIndex1<URI, number>
/**
 * @since 3.0.0
 */
export declare const altNonEmptyArray: Alt1<URI>
/**
 * @since 3.0.0
 */
export declare const traversableNonEmptyArray: Traversable1<URI>
/**
 * @since 3.0.0
 */
export declare const traversableWithIndexNonEmptyArray: TraversableWithIndex1<URI, number>
/**
 * @since 3.0.0
 */
export declare const extendNonEmptyArray: Extend1<URI>
/**
 * @since 3.0.0
 */
export declare const extract: <A>(wa: NonEmptyArray<A>) => A
/**
 * @since 3.0.0
 */
export declare const comonadNonEmptyArray: Comonad1<URI>

/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Lazy, Predicate, Refinement } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import * as RNEA from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'

/* tslint:disable:readonly-array */

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-keyword */
/**
 * @category model
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
/* tslint:enable:readonly-keyword */

// TODO: remove in v3
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = RNEA.cons as any

// TODO: remove in v3
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = RNEA.snoc as any

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>> = RNEA.fromArray as any

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = RNEA.getShow

/**
 * @since 2.0.0
 */
export const head: <A>(nea: NonEmptyArray<A>) => A = RNEA.head

/**
 * @since 2.0.0
 */
export const tail: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.tail as any

/**
 * @category combinators
 * @since 2.0.0
 */
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.reverse as any

/**
 * @since 2.0.0
 */
export const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.min

/**
 * @since 2.0.0
 */
export const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.max

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>> = RNEA.getSemigroup as any

/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = RNEA.getEq

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
 * @category combinators
 * @since 2.0.0
 */
export function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  return RNEA.group(E) as any
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
 * @category combinators
 * @since 2.0.0
 */
export const groupSort: <A>(O: Ord<A>) => (as: Array<A>) => Array<NonEmptyArray<A>> = RNEA.groupSort as any

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
 * @category constructors
 * @since 2.0.0
 */
export const groupBy: <A>(
  f: (a: A) => string
) => (as: Array<A>) => Record<string, NonEmptyArray<A>> = RNEA.groupBy as any

/**
 * @since 2.0.0
 */
export const last: <A>(nea: NonEmptyArray<A>) => A = RNEA.last

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
export const init: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.init as any

/**
 * @category combinators
 * @since 2.0.0
 */
export const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.sort as any

/**
 * @since 2.0.0
 */
export const insertAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.insertAt as any

/**
 * @since 2.0.0
 */
export const updateAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.updateAt as any

/**
 * @since 2.0.0
 */
export const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.modifyAt as any

/**
 * @category combinators
 * @since 2.0.0
 */
export function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A> {
  const l = nea.length
  const as = Array(l)
  for (let i = 0; i < l; i++) {
    as[i] = nea[i]
  }
  return as as any
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> {
  return RNEA.filter(predicate) as any
}

/**
 * @since 2.0.0
 */
export const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.filterWithIndex as any

/**
 * @category Applicative
 * @since 2.0.0
 */
export const of: <A>(a: A) => NonEmptyArray<A> = RNEA.of as any

// TODO: curry in v3
/**
 * @category constructors
 * @since 2.2.0
 */
export function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
export function concat<A>(fx: Array<A>, fy: Array<A>): Array<A> {
  return RNEA.concat(fx as any, fy as any) as any
}

/**
 * @since 2.5.0
 */
export const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A = RNEA.fold

/**
 * @category combinators
 * @since 2.5.1
 */
export const zipWith: <A, B, C>(
  fa: NonEmptyArray<A>,
  fb: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C> = RNEA.zipWith as any

/**
 * @category combinators
 * @since 2.5.1
 */
export const zip: {
  <B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
  <A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
} = RNEA.zip as any

/**
 * @since 2.5.1
 */
export const unzip: <A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>] = RNEA.unzip as any

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const foldMapWithIndex: <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S =
  RNEA.foldMapWithIndex

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S = RNEA.foldMap

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.alt as any

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B> = RNEA.ap as any

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.apSecond as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(
  f: (a: A) => NonEmptyArray<B>
) => (ma: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.chain as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => NonEmptyArray<B>
) => (ma: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.chainFirst as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>> = RNEA.duplicate as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <A, B>(
  f: (fa: NonEmptyArray<A>) => B
) => (ma: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.extend as any

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A> = RNEA.flatten as any

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.map as any

/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.mapWithIndex as any

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduce

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceWithIndex

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduceRight

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceRightWithIndex

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = RNEA.traverse as any

/**
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = RNEA.sequence as any

/**
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> = RNEA.traverseWithIndex as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'NonEmptyArray'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: NonEmptyArray<A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> =
  /*#__PURE__*/
  (() => {
    return Object.assign({}, RNEA.readonlyNonEmptyArray as any, { URI })
  })()

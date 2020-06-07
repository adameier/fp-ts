/**
 * A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".
 *
 * If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
 * `These<E, A>` may fail, succeed, or do both at the same time.
 *
 * There are a few ways to interpret the both case:
 *
 * - You can think of a computation that has a non-fatal error.
 * - You can think of a computation that went as far as it could before erroring.
 * - You can think of a computation that keeps track of errors as it completes.
 *
 * Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
 * both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
 *
 * (description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)
 *
 * Adapted from https://github.com/purescript-contrib/purescript-these
 *
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Either, Left, Right } from './Either'
import { Eq } from './Eq'
import { Foldable2 } from './Foldable'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
/**
 * @since 2.0.0
 */
export declare const URI = 'These'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: These<E, A>
  }
}
/**
 * @since 2.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
/**
 * @since 2.0.0
 */
export declare type These<E, A> = Either<E, A> | Both<E, A>
/**
 * @since 2.0.0
 */
export declare function left<E = never, A = never>(left: E): These<E, A>
/**
 * @since 2.0.0
 */
export declare function right<E = never, A = never>(right: A): These<E, A>
/**
 * @since 2.0.0
 */
export declare function both<E, A>(left: E, right: A): These<E, A>
/**
 * @since 2.0.0
 */
export declare function fold<E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
): (fa: These<E, A>) => B
/**
 * @since 2.4.0
 */
export declare const swap: <E, A>(fa: These<E, A>) => These<A, E>
/**
 * @since 2.0.0
 */
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getEq<E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>>
/**
 * @since 2.0.0
 */
export declare function getApplicative<E>(S: Semigroup<E>): Applicative2C<URI, E>
/**
 * @since 2.0.0
 */
export declare function getMonadThrow<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadThrow2C<URI, E>
/**
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * const f = toTuple(() => 'a', () => 1)
 * assert.deepStrictEqual(f(left('b')), ['b', 1])
 * assert.deepStrictEqual(f(right(2)), ['a', 2])
 * assert.deepStrictEqual(f(both('b', 2)), ['b', 2])
 *
 * @since 3.0.0
 */
export declare function toTuple<E, A>(e: () => E, a: () => A): (fa: These<E, A>) => readonly [E, A]
/**
 * Returns an `E` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 2.0.0
 */
export declare function getLeft<E, A>(fa: These<E, A>): Option<E>
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 2.0.0
 */
export declare function getRight<E, A>(fa: These<E, A>): Option<A>
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isLeft<E, A>(fa: These<E, A>): fa is Left<E>
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isRight<E, A>(fa: These<E, A>): fa is Right<A>
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A>
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * const f = leftOrBoth(() => 'a')
 * assert.deepStrictEqual(f(none), left('a'))
 * assert.deepStrictEqual(f(some(1)), both('a', 1))
 *
 * @since 3.0.0
 */
export declare function leftOrBoth<E>(e: () => E): <A>(ma: Option<A>) => These<E, A>
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * const f = rightOrBoth(() => 1)
 * assert.deepStrictEqual(f(none), right(1))
 * assert.deepStrictEqual(f(some('a')), both('a', 1))
 *
 * @since 3.0.0
 */
export declare function rightOrBoth<A>(a: () => A): <E>(me: Option<E>) => These<E, A>
/**
 * Returns the `E` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 2.0.0
 */
export declare function getLeftOnly<E, A>(fa: These<E, A>): Option<E>
/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 *
 * @since 2.0.0
 */
export declare function getRightOnly<E, A>(fa: These<E, A>): Option<A>
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 2.0.0
 */
export declare function fromOptions<E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>>
/**
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B>
/**
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>
/**
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A>
/**
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B
/**
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable2<URI>['traverse']
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable2<URI>['sequence']
/**
 * @since 3.0.0
 */
export declare const functorThese: Functor2<URI>
/**
 * @since 3.0.0
 */
export declare const bifunctorThese: Bifunctor2<URI>
/**
 * @since 3.0.0
 */
export declare const foldableThese: Foldable2<URI>
/**
 * @since 3.0.0
 */
export declare const traversableThese: Traversable2<URI>

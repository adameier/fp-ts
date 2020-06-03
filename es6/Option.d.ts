/**
 * If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
 * some time (other languages will throw similarly named errors in such a case). Usually this happens because some
 * function returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
 * your client code.
 *
 * ```ts
 * const as: Array<string> = []
 * as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
 * ```
 *
 * `fp-ts` models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
 * handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * ```ts
 * import { lookup } from 'fp-ts/lib/ReadonlyArray'
 *
 * const as: ReadonlyArray<string> = []
 * lookup(0, as) // => Option<string>
 * ```
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at option is: it represents the effect of a possibly failing computation.
 *
 * @since 2.0.0
 */
import { Alternative1 as O } from './Alternative';
import { Applicative1 } from './Applicative';
import { Compactable1, Separated } from './Compactable';
import { Either } from './Either';
import { Eq } from './Eq';
import { Extend1 } from './Extend';
import { Filterable1 } from './Filterable';
import { Foldable1 } from './Foldable';
import { Lazy, Predicate, Refinement } from './function';
import { Monad1 } from './Monad';
import { MonadThrow1 } from './MonadThrow';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Show } from './Show';
import { Traversable1 } from './Traversable';
import { Witherable1 } from './Witherable';
import { Functor1 } from './Functor';
import { Apply1 } from './Apply';
import { Alt1 } from './Alt';
/**
 * @since 2.0.0
 */
export declare const URI = "Option";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: Option<A>;
    }
}
/**
 * @since 2.0.0
 */
export interface None {
    readonly _tag: 'None';
}
/**
 * @since 2.0.0
 */
export interface Some<A> {
    readonly _tag: 'Some';
    readonly value: A;
}
/**
 * @since 2.0.0
 */
export declare type Option<A> = None | Some<A>;
/**
 * @since 2.0.0
 */
export declare const none: Option<never>;
/**
 * @since 2.0.0
 */
export declare function some<A>(a: A): Option<A>;
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @since 2.0.0
 */
export declare function isSome<A>(fa: Option<A>): fa is Some<A>;
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @since 2.0.0
 */
export declare function isNone<A>(fa: Option<A>): fa is None;
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @since 2.0.0
 */
export declare function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Option<A>) => B;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @since 2.0.0
 */
export declare function fromNullable<A>(a: A): Option<NonNullable<A>>;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @since 2.0.0
 */
export declare function toNullable<A>(ma: Option<A>): A | null;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @since 2.0.0
 */
export declare function toUndefined<A>(ma: Option<A>): A | undefined;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @since 2.0.0
 */
export declare function getOrElse<A>(onNone: () => A): (ma: Option<A>) => A;
/**
 * @since 2.6.0
 */
export declare const getOrElseW: <B>(onNone: () => B) => <A>(ma: Option<A>) => A | B;
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, ma: Option<A>) => boolean;
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
export declare function exists<A>(predicate: Predicate<A>): (ma: Option<A>) => boolean;
/**
 * Returns a smart constructor based on the given predicate
 *
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/lib/Option'
 *
 * const getOption = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), none)
 * assert.deepStrictEqual(getOption(1), some(1))
 *
 * @since 2.0.0
 */
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>;
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @since 2.0.0
 */
export declare function tryCatch<A>(f: Lazy<A>): Option<A>;
/**
 * Returns an `E` value if possible
 *
 * @since 2.0.0
 */
export declare function getLeft<E, A>(ma: Either<E, A>): Option<E>;
/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
export declare function getRight<E, A>(ma: Either<E, A>): Option<A>;
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
export declare function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>;
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 *
 * @example
 * import { some, none, fromNullable, mapNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   none
 * )
 *
 * @since 2.0.0
 */
export declare function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: Option<A>) => Option<B>;
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Option<A>>;
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @since 2.0.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<Option<A>>;
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @since 2.0.0
 */
export declare function getOrd<A>(O: Ord<A>): Ord<Option<A>>;
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export declare function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<Option<A>>;
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<A>(M: Monoid<A>): Monoid<Option<A>>;
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @since 2.0.0
 */
export declare function getFirstMonoid<A = never>(): Monoid<Option<A>>;
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @since 2.0.0
 */
export declare function getLastMonoid<A = never>(): Monoid<Option<A>>;
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export declare function getMonoid<A>(S: Semigroup<A>): Monoid<Option<A>>;
/**
 * @since 2.0.0
 */
export declare const map: Functor1<URI>['map'];
/**
 * @since 3.0.0
 */
export declare const functorOption: Functor1<URI>;
/**
 * @since 2.0.0
 */
export declare const ap: Apply1<URI>['ap'];
/**
 * @since 3.0.0
 */
export declare const applyOption: Apply1<URI>;
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<A>;
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<B>;
/**
 * @since 3.0.0
 */
export declare const of: Applicative1<URI>['of'];
/**
 * @since 3.0.0
 */
export declare const applicativeOption: Applicative1<URI>;
/**
 * @since 2.0.0
 */
export declare const chain: Monad1<URI>['chain'];
/**
 * @since 3.0.0
 */
export declare const monadOption: Monad1<URI>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<A>;
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>;
/**
 * @since 3.0.0
 */
export declare const monadThrowOption: MonadThrow1<URI>;
/**
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: Either<E, A>) => Option<A>;
/**
 * @since 2.0.0
 */
export declare const compact: <A>(fa: Option<Option<A>>) => Option<A>;
/**
 * @since 2.0.0
 */
export declare const separate: <A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>;
/**
 * @since 3.0.0
 */
export declare const compactableOption: Compactable1<URI>;
/**
 * @since 2.0.0
 */
export declare const filter: Filterable1<URI>['filter'];
/**
 * @since 2.0.0
 */
export declare const filterMap: Filterable1<URI>['filterMap'];
/**
 * @since 2.0.0
 */
export declare const partition: Filterable1<URI>['partition'];
/**
 * @since 2.0.0
 */
export declare const partitionMap: Filterable1<URI>['partitionMap'];
/**
 * @since 3.0.0
 */
export declare const filterableOption: Filterable1<URI>;
/**
 * @since 2.0.0
 */
export declare const reduce: Foldable1<URI>['reduce'];
/**
 * @since 2.0.0
 */
export declare const foldMap: Foldable1<URI>['foldMap'];
/**
 * @since 2.0.0
 */
export declare const reduceRight: Foldable1<URI>['reduceRight'];
/**
 * @since 3.0.0
 */
export declare const foldableOption: Foldable1<URI>;
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
export declare const traversableOption: Traversable1<URI>;
/**
 * @since 2.0.0
 */
export declare const alt: <A>(that: () => Option<A>) => (fa: Option<A>) => Option<A>;
/**
 * @since 3.0.0
 */
export declare const altOption: Alt1<URI>;
/**
 * @since 3.0.0
 */
export declare const alternativeOption: O<URI>;
/**
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>;
/**
 * @since 3.0.0
 */
export declare const extendOption: Extend1<URI>;
/**
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>;
/**
 * @since 3.0.0
 */
export declare const wither: Witherable1<URI>['wither'];
/**
 * @since 3.0.0
 */
export declare const wilt: Witherable1<URI>['wilt'];
/**
 * @since 3.0.0
 */
export declare const witherableOption: Witherable1<URI>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefinement = exports.exists = exports.elem = exports.mapNullable = exports.witherableOption = exports.wilt = exports.wither = exports.extendOption = exports.duplicate = exports.extend = exports.alternativeOption = exports.zero = exports.altOption = exports.apSecond = exports.apFirst = exports.alt = exports.traversableOption = exports.sequence = exports.traverse = exports.foldableOption = exports.reduceRight = exports.foldMap = exports.reduce = exports.filterableOption = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.compactableOption = exports.separate = exports.compact = exports.monadThrowOption = exports.flatten = exports.chainFirst = exports.monadOption = exports.chain = exports.applicativeOption = exports.of = exports.applyOption = exports.ap = exports.functorOption = exports.map = exports.getMonoid = exports.getLastMonoid = exports.getFirstMonoid = exports.getApplyMonoid = exports.getApplySemigroup = exports.getOrd = exports.getEq = exports.getShow = exports.getOrElseW = exports.getOrElse = exports.toUndefined = exports.toNullable = exports.fold = exports.isNone = exports.isSome = exports.fromEither = exports.getRight = exports.getLeft = exports.tryCatch = exports.fromPredicate = exports.fromNullable = exports.some = exports.none = exports.URI = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category model
 * @since 2.0.0
 */
exports.URI = 'Option';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
exports.none = { _tag: 'None' };
/**
 * @category constructors
 * @since 2.0.0
 */
function some(a) {
    return { _tag: 'Some', value: a };
}
exports.some = some;
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
 * @category constructors
 * @since 2.0.0
 */
function fromNullable(a) {
    return a == null ? exports.none : some(a);
}
exports.fromNullable = fromNullable;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : exports.none); };
}
exports.fromPredicate = fromPredicate;
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
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f) {
    try {
        return some(f());
    }
    catch (e) {
        return exports.none;
    }
}
exports.tryCatch = tryCatch;
/**
 * Returns an `E` value if possible
 *
 * @category constructors
 * @since 2.0.0
 */
function getLeft(ma) {
    return ma._tag === 'Right' ? exports.none : some(ma.left);
}
exports.getLeft = getLeft;
/**
 * Returns an `A` value if possible
 *
 * @category constructors
 * @since 2.0.0
 */
function getRight(ma) {
    return ma._tag === 'Left' ? exports.none : some(ma.right);
}
exports.getRight = getRight;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromEither = function (ma) { return (ma._tag === 'Left' ? exports.none : some(ma.right)); };
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 2.0.0
 */
function isSome(fa) {
    return fa._tag === 'Some';
}
exports.isSome = isSome;
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
function isNone(fa) {
    return fa._tag === 'None';
}
exports.isNone = isNone;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
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
 * @category destructors
 * @since 2.0.0
 */
function fold(onNone, onSome) {
    return function (ma) { return (isNone(ma) ? onNone() : onSome(ma.value)); };
}
exports.fold = fold;
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
 * @category destructors
 * @since 2.0.0
 */
function toNullable(ma) {
    return isNone(ma) ? null : ma.value;
}
exports.toNullable = toNullable;
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
 * @category destructors
 * @since 2.0.0
 */
function toUndefined(ma) {
    return isNone(ma) ? undefined : ma.value;
}
exports.toUndefined = toUndefined;
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
 * @category destructors
 * @since 2.0.0
 */
function getOrElse(onNone) {
    return function (ma) { return (isNone(ma) ? onNone() : ma.value); };
}
exports.getOrElse = getOrElse;
/**
 * @category destructors
 * @since 2.6.0
 */
exports.getOrElseW = getOrElse;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (ma) { return (isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
    };
}
exports.getShow = getShow;
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
 * @category instances
 * @since 2.0.0
 */
function getEq(E) {
    return {
        equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
    };
}
exports.getEq = getEq;
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
 * @category instances
 * @since 2.0.0
 */
function getOrd(O) {
    return {
        equals: getEq(O).equals,
        compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
    };
}
exports.getOrd = getOrd;
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
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : exports.none); }
    };
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @category instances
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: some(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
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
 * @category instances
 * @since 2.0.0
 */
function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: exports.none
    };
}
exports.getFirstMonoid = getFirstMonoid;
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
 * @category instances
 * @since 2.0.0
 */
function getLastMonoid() {
    return {
        concat: function (x, y) { return (isNone(y) ? x : y); },
        empty: exports.none
    };
}
exports.getLastMonoid = getLastMonoid;
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
 * @category instances
 * @since 2.0.0
 */
function getMonoid(S) {
    return {
        concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
        empty: exports.none
    };
}
exports.getMonoid = getMonoid;
var defaultSeparate = { left: exports.none, right: exports.none };
/**
 * @category Functor
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return (isNone(fa) ? exports.none : some(f(fa.value))); }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.functorOption = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @category Apply
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) {
    return isNone(fab) ? exports.none : isNone(fa) ? exports.none : some(fab.value(fa.value));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.applyOption = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @category Applicative
 * @since 3.0.0
 */
exports.of = some;
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeOption = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @category Monad
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) { return (isNone(ma) ? exports.none : f(ma.value)); }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.monadOption = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain
};
/**
 * @category Monad
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @category Monad
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @category instances
 * @since 3.0.0
 */
exports.monadThrowOption = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    throwError: function () { return exports.none; }
};
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.compact = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.separate = function (ma) {
    var o = function_1.pipe(ma, exports.map(function (e) { return ({
        left: getLeft(e),
        right: getRight(e)
    }); }));
    return isNone(o) ? defaultSeparate : o.value;
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.compactableOption = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filter = function (predicate) { return function (fa) {
    return isNone(fa) ? exports.none : predicate(fa.value) ? fa : exports.none;
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filterMap = function (f) { return function (fa) { return (isNone(fa) ? exports.none : f(fa.value)); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partition = function (predicate) { return function (fa) { return ({
    left: function_1.pipe(fa, exports.filter(function (a) { return !predicate(a); })),
    right: function_1.pipe(fa, exports.filter(predicate))
}); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partitionMap = function (f) { return function (fa) { return exports.separate(function_1.pipe(fa, exports.map(f))); }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.filterableOption = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap
};
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = function (b, f) { return function (fa) { return (isNone(fa) ? b : f(b, fa.value)); }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = function (M) { return function (f) { return function (fa) { return (isNone(fa) ? M.empty : f(fa.value)); }; }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = function (b, f) { return function (fa) { return (isNone(fa) ? b : f(fa.value, b)); }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.foldableOption = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @category Traversable
 * @since 3.0.0
 */
exports.traverse = function (F) { return function (f) { return function (ta) { return (isNone(ta) ? F.of(exports.none) : function_1.pipe(f(ta.value), F.map(some))); }; }; };
/**
 * @category Traversable
 * @since 3.0.0
 */
exports.sequence = function (F) { return function (ta) { return (isNone(ta) ? F.of(exports.none) : function_1.pipe(ta.value, F.map(some))); }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.traversableOption = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    map: exports.map,
    traverse: exports.traverse,
    sequence: exports.sequence
};
/**
 * @category Alt
 * @since 2.0.0
 */
exports.alt = function (that) { return function (fa) { return (isNone(fa) ? that() : fa); }; };
/**
 * @category Alt
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @category Alt
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.altOption = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @category Alternative
 * @since 3.0.0
 */
exports.zero = function () { return exports.none; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.alternativeOption = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    alt: exports.alt,
    zero: exports.zero
};
/**
 * @category Extend
 * @since 2.0.0
 */
exports.extend = function (f) { return function (wa) { return (isNone(wa) ? exports.none : some(f(wa))); }; };
/**
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category instances
 * @since 3.0.0
 */
exports.extendOption = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @category Witherable
 * @since 3.0.0
 */
exports.wither = function (F) { return function (f) { return function (fa) { return (isNone(fa) ? F.of(exports.none) : f(fa.value)); }; }; };
/**
 * @category Witherable
 * @since 3.0.0
 */
exports.wilt = function (F) { return function (f) { return function (fa) {
    var o = function_1.pipe(fa, exports.map(function (a) {
        return function_1.pipe(f(a), F.map(function (e) { return ({
            left: getLeft(e),
            right: getRight(e)
        }); }));
    }));
    return isNone(o)
        ? F.of({
            left: exports.none,
            right: exports.none
        })
        : o.value;
}; }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.witherableOption = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap,
    traverse: exports.traverse,
    sequence: exports.sequence,
    wither: exports.wither,
    wilt: exports.wilt
};
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
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
 * @category combinators
 * @since 2.0.0
 */
function mapNullable(f) {
    return function (ma) { return (isNone(ma) ? exports.none : fromNullable(f(ma.value))); };
}
exports.mapNullable = mapNullable;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
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
function elem(E) {
    return function (a, ma) { return (isNone(ma) ? false : E.equals(a, ma.value)); };
}
exports.elem = elem;
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
function exists(predicate) {
    return function (ma) { return (isNone(ma) ? false : predicate(ma.value)); };
}
exports.exists = exists;
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @example
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * export const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 *
 * // @ts-expect-error
 * export const isAbis = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 *
 * @since 2.0.0
 */
function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
exports.getRefinement = getRefinement;

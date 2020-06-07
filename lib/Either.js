"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = exports.elem = exports.toError = exports.filterOrElse = exports.flatten = exports.duplicate = exports.chainW = exports.chainFirst = exports.apSecond = exports.apFirst = exports.orElse = exports.swap = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.monadThrowEither = exports.extendEither = exports.extend = exports.altEither = exports.alt = exports.traversableEither = exports.sequence = exports.traverse = exports.bifunctorEither = exports.mapLeft = exports.bimap = exports.foldableEither = exports.reduceRight = exports.foldMap = exports.reduce = exports.monadEither = exports.chain = exports.applicativeEither = exports.applyEither = exports.ap = exports.functorEither = exports.map = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getValidationAlt = exports.getValidationApplicative = exports.getEq = exports.getShow = exports.stringifyJSON = exports.getOrElseW = exports.getOrElse = exports.fold = exports.isRight = exports.isLeft = exports.parseJSON = exports.tryCatch = exports.fromPredicate = exports.fromOption = exports.fromNullable = exports.right = exports.left = exports.URI = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category model
 * @since 2.0.0
 */
exports.URI = 'Either';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @category constructors
 * @since 2.0.0
 */
function left(e) {
    return { _tag: 'Left', left: e };
}
exports.left = left;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @category constructors
 * @since 2.0.0
 */
function right(a) {
    return { _tag: 'Right', right: a };
}
exports.right = right;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/lib/Either'
 *
 * const parse = fromNullable(() => 'nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 3.0.0
 */
function fromNullable(e) {
    return function (a) { return (a == null ? left(e()) : right(a)); };
}
exports.fromNullable = fromNullable;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    try {
        return right(f());
    }
    catch (e) {
        return left(onError(e));
    }
}
exports.tryCatch = tryCatch;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.0.0
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
exports.parseJSON = parseJSON;
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
function isLeft(ma) {
    switch (ma._tag) {
        case 'Left':
            return true;
        case 'Right':
            return false;
    }
}
exports.isLeft = isLeft;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
function isRight(ma) {
    return isLeft(ma) ? false : true;
}
exports.isRight = isRight;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)); };
}
exports.fold = fold;
/**
 * @category destructors
 * @since 2.0.0
 */
function getOrElse(onLeft) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : ma.right); };
}
exports.getOrElse = getOrElse;
/**
 * @category destructors
 * @since 2.6.0
 */
exports.getOrElseW = getOrElse;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function stringifyJSON(u, onError) {
    return tryCatch(function () { return JSON.stringify(u); }, onError);
}
exports.stringifyJSON = stringifyJSON;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(SE, SA) {
    return {
        show: function (ma) { return (isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
    };
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
function getEq(EL, EA) {
    return {
        equals: function (x, y) {
            return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
        }
    };
}
exports.getEq = getEq;
/**
 * @category instances
 * @since 3.0.0
 */
function getValidationApplicative(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: function (ma) { return function (mab) {
            return isLeft(mab)
                ? isLeft(ma)
                    ? left(S.concat(mab.left, ma.left))
                    : mab
                : isLeft(ma)
                    ? ma
                    : right(mab.right(ma.right));
        }; },
        of: of
    };
}
exports.getValidationApplicative = getValidationApplicative;
/**
 * @category instances
 * @since 3.0.0
 */
function getValidationAlt(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        alt: function (that) { return function (fa) {
            if (isRight(fa)) {
                return fa;
            }
            var fy = that();
            return isLeft(fy) ? left(S.concat(fa.left, fy.left)) : fy;
        }; }
    };
}
exports.getValidationAlt = getValidationAlt;
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationSemigroup(SE, SA) {
    return {
        concat: function (fx, fy) {
            return isLeft(fx)
                ? isLeft(fy)
                    ? left(SE.concat(fx.left, fy.left))
                    : fx
                : isLeft(fy)
                    ? fy
                    : right(SA.concat(fx.right, fy.right));
        }
    };
}
exports.getValidationSemigroup = getValidationSemigroup;
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationMonoid(SE, SA) {
    return {
        concat: getValidationSemigroup(SE, SA).concat,
        empty: right(SA.empty)
    };
}
exports.getValidationMonoid = getValidationMonoid;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right))); }
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
        empty: right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * @category instances
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.functorEither = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) {
    return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.applyEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
var of = right;
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) {
    return isLeft(ma) ? ma : f(ma.right);
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.monadEither = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(b, fa.right);
}; };
/**
 * @category instances
 * @since 2.0.0
 */
exports.foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : f(fa.right);
}; }; };
/**
 * @category instances
 * @since 2.0.0
 */
exports.reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(fa.right, b);
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.foldableEither = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.bimap = function (f, g) { return function (fea) { return (isLeft(fea) ? left(f(fea.left)) : right(g(fea.right))); }; };
/**
 * @category instances
 * @since 2.0.0
 */
exports.mapLeft = function (f) { return function (fea) {
    return isLeft(fea) ? left(f(fea.left)) : fea;
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.bifunctorEither = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.traverse = function (F) { return function (f) { return function (ma) { return (isLeft(ma) ? F.of(left(ma.left)) : function_1.pipe(f(ma.right), F.map(right))); }; }; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.sequence = function (F) { return function (ma) {
    return isLeft(ma) ? F.of(left(ma.left)) : function_1.pipe(ma.right, F.map(right));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.traversableEither = {
    URI: exports.URI,
    map: exports.map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: exports.traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.alt = function (that) { return function (fa) {
    return isLeft(fa) ? that() : fa;
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.altEither = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.extend = function (f) { return function (wa) {
    return isLeft(wa) ? wa : right(f(wa));
}; };
/**
 * @category instances
 * @since 3.0.0
 */
exports.extendEither = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.monadThrowEither = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain,
    throwError: left
};
/**
 * @category instances
 * @since 3.0.0
 */
function getCompactable(M) {
    var empty = left(M.empty);
    var compact = function (ma) {
        return isLeft(ma) ? ma : ma.right._tag === 'None' ? left(M.empty) : right(ma.right.value);
    };
    var separate = function (ma) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : isLeft(ma.right)
                ? { left: right(ma.right.left), right: empty }
                : { left: empty, right: right(ma.right.right) };
    };
    return {
        URI: exports.URI,
        _E: undefined,
        compact: compact,
        separate: separate
    };
}
exports.getCompactable = getCompactable;
/**
 * @category instances
 * @since 3.0.0
 */
function getFilterable(M) {
    var empty = left(M.empty);
    var filter = function (predicate) { return function (ma) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : left(M.empty);
    }; };
    var filterMap = function (f) { return function (ma) {
        if (isLeft(ma)) {
            return ma;
        }
        var ob = f(ma.right);
        return ob._tag === 'None' ? left(M.empty) : right(ob.value);
    }; };
    var partition = function (p) { return function (ma) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : p(ma.right)
                ? { left: empty, right: right(ma.right) }
                : { left: right(ma.right), right: empty };
    }; };
    var partitionMap = function (f) { return function (ma) {
        if (isLeft(ma)) {
            return { left: ma, right: ma };
        }
        var e = f(ma.right);
        return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) };
    }; };
    var compactableEither = getCompactable(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        compact: compactableEither.compact,
        separate: compactableEither.separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap
    };
}
exports.getFilterable = getFilterable;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
function getWitherable(M) {
    var filterableEither = getFilterable(M);
    var wither = function (F) {
        var traverseF = exports.traverse(F);
        return function (f) { return function (ma) { return function_1.pipe(ma, traverseF(f), F.map(filterableEither.compact)); }; };
    };
    var wilt = function (F) {
        var traverseF = exports.traverse(F);
        return function (f) { return function (ma) { return function_1.pipe(ma, traverseF(f), F.map(filterableEither.separate)); }; };
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        compact: filterableEither.compact,
        separate: filterableEither.separate,
        filter: filterableEither.filter,
        filterMap: filterableEither.filterMap,
        partition: filterableEither.partition,
        partitionMap: filterableEither.partitionMap,
        traverse: exports.traverse,
        sequence: exports.sequence,
        reduce: exports.reduce,
        foldMap: exports.foldMap,
        reduceRight: exports.reduceRight,
        wither: wither,
        wilt: wilt
    };
}
exports.getWitherable = getWitherable;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.0.0
 */
function swap(ma) {
    return isLeft(ma) ? right(ma.left) : left(ma.right);
}
exports.swap = swap;
/**
 * @category combinators
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : ma); };
}
exports.orElse = orElse;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @category combinators
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @category combinators
 * @since 2.6.0
 */
exports.chainW = exports.chain;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @category combinators
 * @since 2.0.0
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return function_1.pipe(ma, exports.chain(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// helpers
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @category helper
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
exports.toError = toError;
/**
 * @category helper
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (isLeft(ma) ? false : E.equals(a, ma.right)); };
}
exports.elem = elem;
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/lib/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @category helper
 * @since 2.0.0
 */
function exists(predicate) {
    return function (ma) { return (isLeft(ma) ? false : predicate(ma.right)); };
}
exports.exists = exists;

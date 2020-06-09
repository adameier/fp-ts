import { apComposition } from './Apply';
import * as E from './Either';
import { flow, identity, pipe } from './function';
import * as R from './Reader';
import * as ValidationT from './ValidationT';
/**
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
export var left = flow(E.left, R.of);
/**
 * @since 2.0.0
 */
export var right = flow(E.right, R.of);
/**
 * @since 2.0.0
 */
export var rightReader = 
/*#__PURE__*/
R.map(E.right);
/**
 * @since 2.0.0
 */
export var leftReader = 
/*#__PURE__*/
R.map(E.left);
/**
 * @since 2.0.0
 */
export var fold = flow(E.fold, R.chain);
/**
 * @since 2.0.0
 */
export var getOrElse = function (onLeft) { return R.chain(E.fold(onLeft, R.of)); };
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export var orElse = function (f) { return R.chain(E.fold(f, right)); };
/**
 * @since 2.0.0
 */
export var swap = 
/*#__PURE__*/
R.map(E.swap);
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return R.getSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return R.getSemigroup(E.getApplySemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * @since 2.0.0
 */
export var ask = function () { return E.right; };
/**
 * @since 2.0.0
 */
export var asks = function (f) { return flow(f, E.right); };
/**
 * @since 3.0.0
 */
export function getReaderValidationApplicative(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: apComposition(R.applyReader, E.getValidationApplicative(S)),
        of: of
    };
}
/**
 * @since 3.0.0
 */
export function getReaderValidationAlt(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        alt: ValidationT.alt(S, R.monadReader)
    };
}
/**
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export var chainEitherK = function (f) { return chain(function (a) { return fromEither(f(a)); }); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var alt = function (that) { return R.chain(E.fold(that, right)); };
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
apComposition(R.applyReader, E.applyEither);
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function () { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var bimap = 
/*#__PURE__*/
flow(E.bimap, R.map);
/**
 * @since 2.0.0
 */
export var chain = function (f) { return R.chain(E.fold(left, f)); };
/**
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * @since 2.6.1
 */
export var chainEitherKW = chainEitherK;
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
export var flatten = 
/*#__PURE__*/
chain(identity);
/**
 * @since 2.0.0
 */
export var mapLeft = function (f) {
    return R.map(E.mapLeft(f));
};
/**
 * @since 2.0.0
 */
export var fromEither = function (ma) {
    return E.isLeft(ma) ? left(ma.left) : right(ma.right);
};
/**
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
export var filterOrElse = function (predicate, onFalse) { return function (ma) {
    return pipe(ma, chain(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var map = function (f) {
    return R.map(E.map(f));
};
/**
 * @since 3.0.0
 */
export var functorReaderTask = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyReaderTask = {
    URI: URI,
    map: map,
    ap: ap
};
var of = right;
/**
 * @since 3.0.0
 */
export var applicativeReaderTask = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadReaderTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var bifunctorReaderTask = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 3.0.0
 */
export var altReaderTask = {
    URI: URI,
    map: map,
    alt: alt
};
/**
 * @since 3.0.0
 */
export var monadThrowReaderTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain,
    throwError: left
};

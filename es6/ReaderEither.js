import * as E from './Either';
import { getEitherM } from './EitherT';
import { identity, pipe } from './function';
import { getSemigroup as getReaderSemigroup, monadReader } from './Reader';
import { getValidationM } from './ValidationT';
var MT = 
/*#__PURE__*/
getEitherM(monadReader);
/**
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
export var left = 
/*#__PURE__*/
(function () { return MT.left; })();
/**
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
(function () { return MT.of; })();
/**
 * @since 2.0.0
 */
export var rightReader = 
/*#__PURE__*/
(function () { return MT.rightM; })();
/**
 * @since 2.0.0
 */
export var leftReader = 
/*#__PURE__*/
(function () { return MT.leftM; })();
/**
 * @since 2.0.0
 */
export var fold = 
/*#__PURE__*/
(function () { return MT.fold; })();
/**
 * @since 2.0.0
 */
export var getOrElse = MT.getOrElse;
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export var orElse = 
/*#__PURE__*/
(function () { return MT.orElse; })();
/**
 * @since 2.0.0
 */
export var swap = 
/*#__PURE__*/
(function () { return MT.swap; })();
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getReaderSemigroup(E.getApplySemigroup(S));
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
export function ask() {
    return E.right;
}
/**
 * @since 2.0.0
 */
export function asks(f) {
    return function (r) { return E.right(f(r)); };
}
/**
 * @since 2.0.0
 */
export function local(f) {
    return function (ma) { return function (q) { return ma(f(q)); }; };
}
/**
 * @since 2.3.0
 */
export function getReaderValidation(S) {
    var V = getValidationM(S, monadReader);
    return {
        URI: URI,
        _E: undefined,
        map: V.map,
        ap: V.ap,
        of: V.of,
        alt: V.alt
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
export function chainEitherK(f) {
    return chain(fromEitherK(f));
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var alt = MT.alt;
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
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
(function () { return MT.bimap; })();
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
(function () { return MT.chain; })();
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
export var flatten = chain(identity);
/**
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/
(function () { return MT.mapLeft; })();
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
export var map = 
/*#__PURE__*/
(function () { return MT.map; })();
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
    ap: ap,
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
    ap: ap,
    of: of,
    chain: chain,
    throwError: left
};

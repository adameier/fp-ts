import * as E from './Either';
import * as EitherT from './EitherT';
import { identity, pipe } from './function';
import * as R from './Reader';
import { getValidationM } from './ValidationT';
/**
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
export var left = 
/*#__PURE__*/
(function () { return EitherT.left(R.monadReader); })();
/**
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
(function () { return EitherT.right(R.monadReader); })();
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
export var fold = 
/*#__PURE__*/
(function () { return EitherT.fold(R.monadReader); })();
/**
 * @since 2.0.0
 */
export var getOrElse = 
/*#__PURE__*/
(function () { return EitherT.getOrElse(R.monadReader); })();
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export var orElse = 
/*#__PURE__*/
(function () { return EitherT.orElse(R.monadReader); })();
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
    var V = getValidationM(S, R.monadReader);
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
export var alt = 
/*#__PURE__*/
(function () { return EitherT.alt(R.monadReader); })();
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
(function () { return EitherT.ap(R.monadReader); })();
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
(function () { return EitherT.bimap(R.monadReader); })();
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
(function () { return EitherT.chain(R.monadReader); })();
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
(function () { return EitherT.mapLeft(R.monadReader); })();
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
(function () { return EitherT.map(R.monadReader); })();
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

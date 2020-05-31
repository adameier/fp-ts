var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as E from './Either';
import { getEitherM } from './EitherT';
import { getFilterableComposition } from './Filterable';
import { identity, pipe } from './function';
import { getSemigroup as getIOSemigroup, monadIO } from './IO';
import { getValidationM } from './ValidationT';
var MT = 
/*#__PURE__*/
getEitherM(monadIO);
/**
 * @since 2.0.0
 */
export var URI = 'IOEither';
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
export var rightIO = 
/*#__PURE__*/
(function () { return MT.rightM; })();
/**
 * @since 2.0.0
 */
export var leftIO = 
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
export var getOrElse = 
/*#__PURE__*/
(function () { return MT.getOrElse; })();
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
    return getIOSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getIOSemigroup(E.getApplySemigroup(S));
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
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
export function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket(acquire, use, release) {
    return pipe(acquire, chain(function (a) {
        return pipe(pipe(use(a), monadIO.map(E.right)), chain(function (e) {
            return pipe(release(a, e), chain(function () { return (E.isLeft(e) ? left(e.left) : of(e.right)); }));
        }));
    }));
}
/**
 * @since 3.0.0
 */
export function getIOValidation(S) {
    var V = getValidationM(S, monadIO);
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
 * @since 2.1.0
 */
export function getFilterable(M) {
    var F = E.getWitherable(M);
    return __assign({ URI: URI, _E: undefined }, getFilterableComposition(monadIO, F));
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
/**
 * @since 2.0.0
 */
export var fromEither = function (ma) {
    return ma._tag === 'Left' ? left(ma.left) : right(ma.right);
};
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
export var functorIOEither = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
/**
 * @since 3.0.0
 */
export var applyIOEither = __assign(__assign({}, functorIOEither), { ap: ap });
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
 * @since 3.0.0
 */
export var of = right;
/**
 * @since 3.0.0
 */
export var applicativeIOEither = __assign(__assign({}, applyIOEither), { of: of });
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
(function () { return MT.chain; })();
/**
 * @since 3.0.0
 */
export var monadIOEither = __assign(__assign({}, applicativeIOEither), { chain: chain });
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
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
export var flatten = chain(identity);
/**
 * @since 2.0.0
 */
export var bimap = 
/*#__PURE__*/
(function () { return MT.bimap; })();
/**
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/
(function () { return MT.mapLeft; })();
/**
 * @since 3.0.0
 */
export var bifunctorIOEither = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 2.0.0
 */
export var alt = 
/*#__PURE__*/
(function () { return MT.alt; })();
/**
 * @since 3.0.0
 */
export var altIOEither = __assign(__assign({}, functorIOEither), { alt: alt });
/**
 * @since 3.0.0
 */
export var monadIOIOEither = __assign(__assign({}, monadIOEither), { fromIO: rightIO });
/**
 * @since 3.0.0
 */
export var monadThrowIOEither = __assign(__assign({}, monadIOEither), { throwError: left });

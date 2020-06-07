"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadThrowReaderTask = exports.altReaderTask = exports.bifunctorReaderTask = exports.monadReaderTask = exports.applicativeReaderTask = exports.applyReaderTask = exports.functorReaderTask = exports.map = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.mapLeft = exports.flatten = exports.chainFirst = exports.chainEitherKW = exports.chainW = exports.chain = exports.bimap = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.chainEitherK = exports.fromEitherK = exports.getReaderValidationAlt = exports.getReaderValidationApplicative = exports.asks = exports.ask = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.swap = exports.orElse = exports.getOrElseW = exports.getOrElse = exports.fold = exports.leftReader = exports.rightReader = exports.right = exports.left = exports.URI = void 0;
var Apply_1 = require("./Apply");
var E = require("./Either");
var function_1 = require("./function");
var R = require("./Reader");
var ValidationT = require("./ValidationT");
/**
 * @since 2.0.0
 */
exports.URI = 'ReaderEither';
/**
 * @since 2.0.0
 */
exports.left = function_1.flow(E.left, R.of);
/**
 * @since 2.0.0
 */
exports.right = function_1.flow(E.right, R.of);
/**
 * @since 2.0.0
 */
exports.rightReader = 
/*#__PURE__*/
R.map(E.right);
/**
 * @since 2.0.0
 */
exports.leftReader = 
/*#__PURE__*/
R.map(E.left);
/**
 * @since 2.0.0
 */
exports.fold = function_1.flow(E.fold, R.chain);
/**
 * @since 2.0.0
 */
exports.getOrElse = function (onLeft) { return R.chain(E.fold(onLeft, R.of)); };
/**
 * @since 2.6.0
 */
exports.getOrElseW = exports.getOrElse;
/**
 * @since 2.0.0
 */
exports.orElse = function (f) { return R.chain(E.fold(f, exports.right)); };
/**
 * @since 2.0.0
 */
exports.swap = 
/*#__PURE__*/
R.map(E.swap);
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getSemigroup(S) {
    return R.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return R.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * @since 2.0.0
 */
function ask() {
    return E.right;
}
exports.ask = ask;
/**
 * @since 2.0.0
 */
function asks(f) {
    return function (r) { return E.right(f(r)); };
}
exports.asks = asks;
/**
 * @since 3.0.0
 */
function getReaderValidationApplicative(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: Apply_1.apComposition(R.applyReader, E.getValidationApplicative(S)),
        of: of
    };
}
exports.getReaderValidationApplicative = getReaderValidationApplicative;
/**
 * @since 3.0.0
 */
function getReaderValidationAlt(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        alt: ValidationT.alt(S, R.monadReader)
    };
}
exports.getReaderValidationAlt = getReaderValidationAlt;
/**
 * @since 2.4.0
 */
function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromEither(f.apply(void 0, a));
    };
}
exports.fromEitherK = fromEitherK;
/**
 * @since 2.4.0
 */
exports.chainEitherK = function (f) { return exports.chain(function (a) { return exports.fromEither(f(a)); }); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.alt = function (that) { return R.chain(E.fold(that, exports.right)); };
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
Apply_1.apComposition(R.applyReader, E.applyEither);
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.bimap = function_1.flow(E.bimap, R.map);
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return R.chain(E.fold(exports.left, f)); };
/**
 * @since 2.6.0
 */
exports.chainW = exports.chain;
/**
 * @since 2.6.1
 */
exports.chainEitherKW = exports.chainEitherK;
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.mapLeft = function (f) {
    return R.map(E.mapLeft(f));
};
/**
 * @since 2.0.0
 */
exports.fromEither = function (ma) {
    return E.isLeft(ma) ? exports.left(ma.left) : exports.right(ma.right);
};
/**
 * @since 2.0.0
 */
exports.fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? exports.left(onNone()) : exports.right(ma.value);
}; };
/**
 * @since 2.0.0
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return function_1.pipe(ma, exports.chain(function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = function (f) {
    return R.map(E.map(f));
};
/**
 * @since 3.0.0
 */
exports.functorReaderTask = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyReaderTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
var of = exports.right;
/**
 * @since 3.0.0
 */
exports.applicativeReaderTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @since 3.0.0
 */
exports.monadReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.bifunctorReaderTask = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 3.0.0
 */
exports.altReaderTask = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @since 3.0.0
 */
exports.monadThrowReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain,
    throwError: exports.left
};

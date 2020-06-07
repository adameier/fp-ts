"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadIOIO = exports.fromIO = exports.flatten = exports.chainFirst = exports.monadIO = exports.chain = exports.applicativeIO = exports.apSecond = exports.apFirst = exports.applyIO = exports.ap = exports.functorIO = exports.map = exports.getMonoid = exports.of = exports.getSemigroup = exports.URI = void 0;
/**
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * @since 2.0.0
 */
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'IO';
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return S.concat(x(), y()); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
exports.of = function (a) { return function () { return a; }; };
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function () { return f(fa()); }; }; };
/**
 * @since 3.0.0
 */
exports.functorIO = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) { return function () { return fab()(fa()); }; }; };
/**
 * @since 3.0.0
 */
exports.applyIO = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
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
 * @since 3.0.0
 */
exports.applicativeIO = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) { return function () { return f(ma())(); }; }; };
/**
 * @since 3.0.0
 */
exports.monadIO = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain
};
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
 * @since 3.0.0
 */
exports.fromIO = function_1.identity;
/**
 * @since 3.0.0
 */
exports.monadIOIO = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    fromIO: exports.fromIO
};

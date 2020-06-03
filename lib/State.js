"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadState = exports.applicativeState = exports.applyState = exports.functorState = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.of = exports.gets = exports.modify = exports.put = exports.get = exports.execute = exports.evaluate = exports.URI = void 0;
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'State';
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 3.0.0
 */
exports.evaluate = function (s) { return function (ma) { return ma(s)[0]; }; };
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 3.0.0
 */
exports.execute = function (s) { return function (ma) { return ma(s)[1]; }; };
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = function () { return function (s) { return [s, s]; }; };
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = function (s) { return function () { return [undefined, s]; }; };
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = function (f) { return function (s) { return [undefined, f(s)]; }; };
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = function (f) { return function (s) { return [f(s), s]; }; };
/**
 * @since 2.0.0
 */
exports.of = function (a) { return function (s) { return [a, s]; }; };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) { return function (s1) {
    var _a = fab(s1), f = _a[0], s2 = _a[1];
    var _b = fa(s2), a = _b[0], s3 = _b[1];
    return [f(a), s3];
}; }; };
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function (_) { return a; }; }), exports.ap(fb));
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
exports.chain = function (f) { return function (ma) { return function (s1) {
    var _a = ma(s1), a = _a[0], s2 = _a[1];
    return f(a)(s2);
}; }; };
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
exports.map = function (f) { return function (fa) { return function (s1) {
    var _a = fa(s1), a = _a[0], s2 = _a[1];
    return [f(a), s2];
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorState = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 3.0.0
 */
exports.applicativeState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.monadState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    chain: exports.chain
};

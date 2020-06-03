"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonad = exports.functorWriter = exports.map = exports.censor = exports.listens = exports.pass = exports.listen = exports.tell = exports.execute = exports.evaluate = exports.URI = void 0;
/**
 * @since 2.0.0
 */
exports.URI = 'Writer';
/**
 * @since 2.0.0
 */
exports.evaluate = function (fa) { return fa()[0]; };
/**
 * @since 2.0.0
 */
exports.execute = function (fa) { return fa()[1]; };
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
exports.tell = function (w) { return function () { return [undefined, w]; }; };
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
exports.listen = function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, w], w];
}; };
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
exports.pass = function (fa) { return function () {
    var _a = fa(), _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
    return [a, f(w)];
}; };
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
exports.listens = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, f(w)], w];
}; }; };
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
exports.censor = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [a, f(w)];
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [f(a), w];
}; }; };
/**
 * @since 3.0.0
 */
exports.functorWriter = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
function getMonad(M) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: function (fa) { return function (fab) { return function () {
            var _a = fab(), f = _a[0], w1 = _a[1];
            var _b = fa(), a = _b[0], w2 = _b[1];
            return [f(a), M.concat(w1, w2)];
        }; }; },
        of: function (a) { return function () { return [a, M.empty]; }; },
        chain: function (f) { return function (fa) { return function () {
            var _a = fa(), a = _a[0], w1 = _a[1];
            var _b = f(a)(), b = _b[0], w2 = _b[1];
            return [b, M.concat(w1, w2)];
        }; }; }
    };
}
exports.getMonad = getMonad;

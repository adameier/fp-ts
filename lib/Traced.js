"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComonad = exports.getExtend = exports.functorTraced = exports.map = exports.censor = exports.listens = exports.listen = exports.tracks = exports.URI = void 0;
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.URI = 'Traced';
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
exports.tracks = function (M) { return function (f) { return function (wa) {
    return wa(f(wa(M.empty)));
}; }; };
/**
 * Get the current position
 *
 * @since 2.0.0
 */
exports.listen = function (wa) { return function (p) { return [wa(p), p]; }; };
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
exports.listens = function (f) { return function (wa) { return function (e) { return [wa(e), f(e)]; }; }; };
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
exports.censor = function (f) { return function (wa) { return function (e) { return wa(f(e)); }; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function (p) { return f(fa(p)); }; }; };
/**
 * @since 3.0.0
 */
exports.functorTraced = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
function getExtend(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        extend: function (f) { return function (wa) { return function (p1) { return f(function (p2) { return wa(S.concat(p1, p2)); }); }; }; }
    };
}
exports.getExtend = getExtend;
/**
 * @since 2.0.0
 */
function getComonad(M) {
    var E = getExtend(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        extend: E.extend,
        extract: function (wa) { return wa(M.empty); }
    };
}
exports.getComonad = getComonad;

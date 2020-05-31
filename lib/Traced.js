"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComonad = exports.functorTraced = exports.map = exports.censor = exports.listens = exports.listen = exports.tracks = exports.URI = void 0;
/**
 * @since 2.0.0
 */
exports.URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
exports.tracks = tracks;
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
exports.listen = listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
exports.censor = censor;
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
function getComonad(M) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        extend: function (f) { return function (wa) { return function (p1) { return f(function (p2) { return wa(M.concat(p1, p2)); }); }; }; },
        extract: function (wa) { return wa(M.empty); }
    };
}
exports.getComonad = getComonad;

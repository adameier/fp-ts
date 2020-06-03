// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var URI = 'Traced';
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export var tracks = function (M) { return function (f) { return function (wa) {
    return wa(f(wa(M.empty)));
}; }; };
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export var listen = function (wa) { return function (p) { return [wa(p), p]; }; };
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export var listens = function (f) { return function (wa) { return function (e) { return [wa(e), f(e)]; }; }; };
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export var censor = function (f) { return function (wa) { return function (e) { return wa(f(e)); }; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return function (p) { return f(fa(p)); }; }; };
/**
 * @since 3.0.0
 */
export var functorTraced = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export function getExtend(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        extend: function (f) { return function (wa) { return function (p1) { return f(function (p2) { return wa(S.concat(p1, p2)); }); }; }; }
    };
}
/**
 * @since 2.0.0
 */
export function getComonad(M) {
    var E = getExtend(M);
    return {
        URI: URI,
        _E: undefined,
        map: map,
        extend: E.extend,
        extract: function (wa) { return wa(M.empty); }
    };
}

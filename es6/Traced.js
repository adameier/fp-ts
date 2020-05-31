/**
 * @since 2.0.0
 */
export var URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
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
export function getComonad(M) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        extend: function (f) { return function (wa) { return function (p1) { return f(function (p2) { return wa(M.concat(p1, p2)); }); }; }; },
        extract: function (wa) { return wa(M.empty); }
    };
}

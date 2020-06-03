import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'State';
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 3.0.0
 */
export var evaluate = function (s) { return function (ma) { return ma(s)[0]; }; };
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 3.0.0
 */
export var execute = function (s) { return function (ma) { return ma(s)[1]; }; };
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = function () { return function (s) { return [s, s]; }; };
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = function (s) { return function () { return [undefined, s]; }; };
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = function (f) { return function (s) { return [undefined, f(s)]; }; };
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = function (f) { return function (s) { return [f(s), s]; }; };
/**
 * @since 2.0.0
 */
export var of = function (a) { return function (s) { return [a, s]; }; };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return function (s1) {
    var _a = fab(s1), f = _a[0], s2 = _a[1];
    var _b = fa(s2), a = _b[0], s3 = _b[1];
    return [f(a), s3];
}; }; };
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function (_) { return a; }; }), ap(fb));
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
export var chain = function (f) { return function (ma) { return function (s1) {
    var _a = ma(s1), a = _a[0], s2 = _a[1];
    return f(a)(s2);
}; }; };
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
export var map = function (f) { return function (fa) { return function (s1) {
    var _a = fa(s1), a = _a[0], s2 = _a[1];
    return [f(a), s2];
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorState = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyState = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 3.0.0
 */
export var applicativeState = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadState = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};

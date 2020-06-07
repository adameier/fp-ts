/**
 * @since 2.0.0
 */
export var URI = 'Writer';
/**
 * @since 2.0.0
 */
export var evaluate = function (fa) { return fa()[0]; };
/**
 * @since 2.0.0
 */
export var execute = function (fa) { return fa()[1]; };
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export var tell = function (w) { return function () { return [undefined, w]; }; };
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export var listen = function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, w], w];
}; };
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export var pass = function (fa) { return function () {
    var _a = fa(), _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
    return [a, f(w)];
}; };
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export var listens = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, f(w)], w];
}; }; };
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export var censor = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [a, f(w)];
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category Functor
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [f(a), w];
}; }; };
/**
 * @category instances
 * @since 3.0.0
 */
export var functorWriter = {
    URI: URI,
    map: map
};
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplicative(M) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: function (fa) { return function (fab) { return function () {
            var _a = fab(), f = _a[0], w1 = _a[1];
            var _b = fa(), a = _b[0], w2 = _b[1];
            return [f(a), M.concat(w1, w2)];
        }; }; },
        of: function (a) { return function () { return [a, M.empty]; }; }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad(M) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        of: function (a) { return function () { return [a, M.empty]; }; },
        chain: function (f) { return function (fa) { return function () {
            var _a = fa(), a = _a[0], w1 = _a[1];
            var _b = f(a)(), b = _b[0], w2 = _b[1];
            return [b, M.concat(w1, w2)];
        }; }; }
    };
}

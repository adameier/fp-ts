/**
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * `IO` actions are _thunks_ so they are terminated by calling their `()` function application that executes the
 * computation and returns the result. Ideally each application should call `()` only once for a root value of type
 * `Task` or `IO` that represents the entire application. However, this might vary a bit depending on how you construct
 * your application.  An application framework with `fp-ts` types might take care of calling `()` for you, while another
 * application framework without `fp-ts` typing might force you to call `()` at multiple locations whenever the
 * framework demands less strictly typed values as inputs for its method calls.
 *
 * @since 2.0.0
 */
import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'IO';
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return S.concat(x(), y()); }; }
    };
}
/**
 * @since 2.0.0
 */
export var of = function (a) { return function () { return a; }; };
/**
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return function () { return f(fa()); }; }; };
/**
 * @since 3.0.0
 */
export var functorIO = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return function () { return fab()(fa()); }; }; };
/**
 * @since 3.0.0
 */
export var applyIO = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function () { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 3.0.0
 */
export var applicativeIO = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return function () { return f(ma())(); }; }; };
/**
 * @since 3.0.0
 */
export var monadIO = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
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
 * @since 3.0.0
 */
export var fromIO = identity;
/**
 * @since 3.0.0
 */
export var monadIOIO = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    fromIO: fromIO
};

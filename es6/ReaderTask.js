import { flow, identity, pipe } from './function';
import * as R from './Reader';
import * as T from './Task';
/**
 * @since 2.3.0
 */
export var URI = 'ReaderTask';
/**
 * @since 2.3.0
 */
export var fromTask = 
/*#__PURE__*/
R.of;
/**
 * @since 2.3.0
 */
export var fromReader = function (ma) { return flow(ma, T.of); };
/**
 * @since 2.3.0
 */
export function fromIO(ma) {
    return fromTask(T.fromIO(ma));
}
/**
 * @since 2.3.0
 */
export var of = function (a) { return function () { return T.of(a); }; };
/**
 * @since 2.3.0
 */
export function getSemigroup(S) {
    return R.getSemigroup(T.getSemigroup(S));
}
/**
 * @since 2.3.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
/**
 * @since 2.3.0
 */
export var ask = function () { return T.of; };
/**
 * @since 2.3.0
 */
export var asks = function (f) { return function (r) { return pipe(T.of(r), T.map(f)); }; };
/**
 * @since 2.4.0
 */
export function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export var chainIOK = function (f) {
    return chain(function (a) { return fromIO(f(a)); });
};
/**
 * @since 2.4.0
 */
export function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTask(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export var chainTaskK = function (f) {
    return chain(function (a) { return fromTask(f(a)); });
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.3.0
 */
export var ap = function (fa) { return function (fab) { return function (r) { return pipe(fab(r), T.ap(fa(r))); }; }; };
/**
 * @since 2.3.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function (_) { return a; }; }), ap(fb));
}; };
/**
 * @since 2.3.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 2.3.0
 */
export var chain = function (f) { return function (fa) { return function (r) {
    return pipe(fa(r), T.chain(function (a) { return f(a)(r); }));
}; }; };
/**
 * @since 2.3.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.3.0
 */
export var flatten = chain(identity);
/**
 * @since 2.3.0
 */
export var map = function (f) { return function (fa) {
    return flow(fa, T.map(f));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorReaderTask = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyReaderTask = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @category instances
 * @since 3.0.0
 */
export var applicativeReaderTaskPar = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @category instances
 * @since 3.0.0
 */
export var applicativeReaderTaskSeq = {
    URI: URI,
    map: map,
    of: of,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; }
};
/**
 * @since 3.0.0
 */
export var monadReaderTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var monadIOReaderTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
export var monadTaskReaderTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain,
    fromIO: fromIO,
    fromTask: fromTask
};

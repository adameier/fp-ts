/**
 * @since 2.3.0
 */
import { identity, pipe } from './function';
import * as R from './Reader';
import * as ReaderT from './ReaderT';
import * as T from './Task';
/**
 * @since 2.3.0
 */
export var URI = 'ReaderTask';
/**
 * @since 2.4.0
 */
export function run(ma, r) {
    return ma(r)();
}
/**
 * @since 2.3.0
 */
export var fromTask = 
/*#__PURE__*/
R.of;
/**
 * @since 2.3.0
 */
export var fromReader = 
/*#__PURE__*/
ReaderT.fromReader(T.monadTask);
/**
 * @since 2.3.0
 */
export function fromIO(ma) {
    return fromTask(T.fromIO(ma));
}
/**
 * @since 2.3.0
 */
export var of = 
/*#__PURE__*/
ReaderT.of(T.monadTask);
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
export var asks = 
/*#__PURE__*/
ReaderT.asks(T.monadTask);
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
export function chainIOK(f) {
    return chain(fromIOK(f));
}
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
export function chainTaskK(f) {
    return chain(fromTaskK(f));
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.3.0
 */
export var ap = 
/*#__PURE__*/
ReaderT.ap(T.monadTask);
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
export var chain = 
/*#__PURE__*/
ReaderT.chain(T.monadTask);
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
export var map = 
/*#__PURE__*/
ReaderT.map(T.monadTask);
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
 * @since 3.0.0
 */
export var applicativeReaderTask = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadReaderTask = {
    URI: URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var monadIOReaderTask = {
    URI: URI,
    map: map,
    of: of,
    ap: ap,
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
    ap: ap,
    chain: chain,
    fromIO: fromIO,
    fromTask: fromTask
};
/**
 * TODO
 * @since 2.3.0
 */
export var readerTaskSeq = {
    URI: URI,
    map: map,
    of: of,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; },
    chain: chain,
    fromIO: fromIO,
    fromTask: fromTask
};

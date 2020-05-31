/**
 * @since 2.3.0
 */
import { identity, pipe } from './function';
import { getSemigroup as getReaderSemigroup } from './Reader';
import { getReaderM } from './ReaderT';
import * as T from './Task';
var MT = 
/*#__PURE__*/
getReaderM(T.monadTask);
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
(function () { return MT.fromM; })();
/**
 * @since 2.3.0
 */
export var fromReader = 
/*#__PURE__*/
(function () { return MT.fromReader; })();
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
(function () { return MT.of; })();
/**
 * @since 2.3.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(T.getSemigroup(S));
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
export var ask = 
/*#__PURE__*/
(function () { return MT.ask; })();
/**
 * @since 2.3.0
 */
export var asks = 
/*#__PURE__*/
(function () { return MT.asks; })();
/**
 * @since 2.3.0
 */
export var local = 
/*#__PURE__*/
(function () { return MT.local; })();
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
(function () { return MT.ap; })();
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
(function () { return MT.chain; })();
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
(function () { return MT.map; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
export var monadReaderTask = {
    URI: URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
/**
 * @since 2.3.0
 */
export var readerTask = {
    URI: URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    fromIO: fromIO,
    fromTask: fromTask
};
/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
export var readerTaskSeq = 
/*#__PURE__*/
(function () {
    return {
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
})();

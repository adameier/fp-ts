"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerTaskSeq = exports.monadTaskReaderTask = exports.monadIOReaderTask = exports.monadReaderTask = exports.applicativeReaderTask = exports.applyReaderTask = exports.functorReaderTask = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.chainTaskK = exports.fromTaskK = exports.chainIOK = exports.fromIOK = exports.asks = exports.ask = exports.getMonoid = exports.getSemigroup = exports.of = exports.fromIO = exports.fromReader = exports.fromTask = exports.run = exports.URI = void 0;
/**
 * @since 2.3.0
 */
var function_1 = require("./function");
var R = require("./Reader");
var ReaderT = require("./ReaderT");
var T = require("./Task");
/**
 * @since 2.3.0
 */
exports.URI = 'ReaderTask';
/**
 * @since 2.4.0
 */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
/**
 * @since 2.3.0
 */
exports.fromTask = 
/*#__PURE__*/
R.of;
/**
 * @since 2.3.0
 */
exports.fromReader = 
/*#__PURE__*/
ReaderT.fromReader(T.monadTask);
/**
 * @since 2.3.0
 */
function fromIO(ma) {
    return exports.fromTask(T.fromIO(ma));
}
exports.fromIO = fromIO;
/**
 * @since 2.3.0
 */
exports.of = 
/*#__PURE__*/
ReaderT.of(T.monadTask);
/**
 * @since 2.3.0
 */
function getSemigroup(S) {
    return R.getSemigroup(T.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.3.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.3.0
 */
exports.ask = function () { return T.of; };
/**
 * @since 2.3.0
 */
exports.asks = 
/*#__PURE__*/
ReaderT.asks(T.monadTask);
/**
 * @since 2.4.0
 */
function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
exports.fromIOK = fromIOK;
/**
 * @since 2.4.0
 */
function chainIOK(f) {
    return exports.chain(fromIOK(f));
}
exports.chainIOK = chainIOK;
/**
 * @since 2.4.0
 */
function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromTask(f.apply(void 0, a));
    };
}
exports.fromTaskK = fromTaskK;
/**
 * @since 2.4.0
 */
function chainTaskK(f) {
    return exports.chain(fromTaskK(f));
}
exports.chainTaskK = chainTaskK;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.3.0
 */
exports.ap = 
/*#__PURE__*/
ReaderT.ap(T.monadTask);
/**
 * @since 2.3.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function (_) { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.3.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.3.0
 */
exports.chain = 
/*#__PURE__*/
ReaderT.chain(T.monadTask);
/**
 * @since 2.3.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.3.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.3.0
 */
exports.map = 
/*#__PURE__*/
ReaderT.map(T.monadTask);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorReaderTask = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyReaderTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 3.0.0
 */
exports.applicativeReaderTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.monadReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: exports.ap,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.monadIOReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: exports.ap,
    chain: exports.chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
exports.monadTaskReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: exports.ap,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: exports.fromTask
};
/**
 * TODO
 * @since 2.3.0
 */
exports.readerTaskSeq = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; },
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: exports.fromTask
};

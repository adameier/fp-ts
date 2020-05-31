"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerTaskSeq = exports.readerTask = exports.monadReaderTask = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.chainTaskK = exports.fromTaskK = exports.chainIOK = exports.fromIOK = exports.local = exports.asks = exports.ask = exports.getMonoid = exports.getSemigroup = exports.of = exports.fromIO = exports.fromReader = exports.fromTask = exports.run = exports.URI = void 0;
/**
 * @since 2.3.0
 */
var function_1 = require("./function");
var Reader_1 = require("./Reader");
var ReaderT_1 = require("./ReaderT");
var T = require("./Task");
var MT = 
/*#__PURE__*/
ReaderT_1.getReaderM(T.monadTask);
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
(function () { return MT.fromM; })();
/**
 * @since 2.3.0
 */
exports.fromReader = 
/*#__PURE__*/
(function () { return MT.fromReader; })();
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
(function () { return MT.of; })();
/**
 * @since 2.3.0
 */
function getSemigroup(S) {
    return Reader_1.getSemigroup(T.getSemigroup(S));
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
exports.ask = 
/*#__PURE__*/
(function () { return MT.ask; })();
/**
 * @since 2.3.0
 */
exports.asks = 
/*#__PURE__*/
(function () { return MT.asks; })();
/**
 * @since 2.3.0
 */
exports.local = 
/*#__PURE__*/
(function () { return MT.local; })();
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
(function () { return MT.ap; })();
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
(function () { return MT.chain; })();
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
(function () { return MT.map; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
exports.monadReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: exports.ap,
    chain: exports.chain
};
/**
 * @since 2.3.0
 */
exports.readerTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: exports.ap,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: exports.fromTask
};
/**
 * Like `readerTask` but `ap` is sequential
 * @since 2.3.0
 */
exports.readerTaskSeq = 
/*#__PURE__*/
(function () {
    return {
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
})();

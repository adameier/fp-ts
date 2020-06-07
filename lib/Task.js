"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadTaskTask = exports.monadIOTask = exports.chainIOK = exports.flatten = exports.chainFirst = exports.monadTask = exports.chain = exports.applicativeTaskSeq = exports.applicativeTaskPar = exports.of = exports.apSecond = exports.apFirst = exports.applyTask = exports.ap = exports.functorTask = exports.map = exports.getRaceMonoid = exports.getMonoid = exports.getSemigroup = exports.never = exports.fromIOK = exports.fromIO = exports.delay = exports.URI = void 0;
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Task';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function delay(millis) {
    return function (ma) { return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    }; };
}
exports.delay = delay;
/**
 * @since 2.0.0
 */
function fromIO(ma) {
    return function () { return Promise.resolve(ma()); };
}
exports.fromIO = fromIO;
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
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.never = function () { return new Promise(function (_) { return undefined; }); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * Note: uses `Promise.race` internally
 *
 * @since 2.0.0
 */
function getRaceMonoid() {
    return {
        concat: function (x, y) { return function () { return Promise.race([x(), y()]); }; },
        empty: exports.never
    };
}
exports.getRaceMonoid = getRaceMonoid;
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function () { return fa().then(f); }; }; };
/**
 * @since 3.0.0
 */
exports.functorTask = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) { return function () {
    return Promise.all([fab(), fa()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    });
}; }; };
/**
 * @since 3.0.0
 */
exports.applyTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
function of(a) {
    return function () { return Promise.resolve(a); };
}
exports.of = of;
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeTaskPar = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeTaskSeq = {
    URI: exports.URI,
    map: exports.map,
    ap: function (fa) { return function (fab) { return function () { return fab().then(function (f) { return fa().then(function (a) { return f(a); }); }); }; }; },
    of: of
};
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) { return function () {
    return ma().then(function (a) { return f(a)(); });
}; }; };
/**
 * @since 3.0.0
 */
exports.monadTask = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain
};
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @since 2.4.0
 */
function chainIOK(f) {
    return exports.chain(fromIOK(f));
}
exports.chainIOK = chainIOK;
/**
 * @since 3.0.0
 */
exports.monadIOTask = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
exports.monadTaskTask = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: function_1.identity
};

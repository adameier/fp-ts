"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryReader = exports.semigroupoidReader = exports.pipe = exports.profunctorReader = exports.promap = exports.flatten = exports.chainW = exports.chainFirst = exports.monadReader = exports.chain = exports.applicativeReader = exports.apSecond = exports.apFirst = exports.applyReader = exports.ap = exports.functorReader = exports.map = exports.of = exports.getMonoid = exports.getSemigroup = exports.local = exports.asks = exports.ask = exports.URI = void 0;
var F = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Reader';
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
exports.ask = function () { return F.identity; };
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
exports.asks = function (f) { return function (r) { return f(r); }; };
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
exports.local = function (f) { return function (ma) { return function (q) { return ma(f(q)); }; }; };
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
exports.of = function (a) { return function () { return a; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function (r) { return f(fa(r)); }; }; };
/**
 * @since 3.0.0
 */
exports.functorReader = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) { return function (r) {
    return fab(r)(fa(r));
}; }; };
/**
 * @since 3.0.0
 */
exports.applyReader = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return F.pipe(fa, exports.map(function (a) { return function (_) { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return F.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 3.0.0
 */
exports.applicativeReader = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return function (fa) { return function (r) {
    return f(fa(r))(r);
}; }; };
/**
 * @since 3.0.0
 */
exports.monadReader = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain
};
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return F.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.6.0
 */
exports.chainW = exports.chain;
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(F.identity);
/**
 * @since 2.0.0
 */
exports.promap = function (f, g) { return function (fea) { return function (a) { return g(fea(f(a))); }; }; };
/**
 * @since 3.0.0
 */
exports.profunctorReader = {
    URI: exports.URI,
    map: exports.map,
    promap: exports.promap
};
/**
 * @since 2.0.0
 */
exports.pipe = function (fbc) { return function (fab) { return function (a) {
    return fbc(fab(a));
}; }; };
/**
 * @since 3.0.0
 */
exports.semigroupoidReader = {
    URI: exports.URI,
    pipe: exports.pipe
};
/**
 * @since 3.0.0
 */
exports.categoryReader = {
    URI: exports.URI,
    pipe: exports.pipe,
    id: function () { return F.identity; }
};

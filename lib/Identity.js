"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traversableIdentity = exports.sequence = exports.traverse = exports.comonadIdentity = exports.extract = exports.duplicate = exports.extendIdentity = exports.extend = exports.altIdentity = exports.alt = exports.foldableIdentity = exports.reduceRight = exports.foldMap = exports.reduce = exports.flatten = exports.chainFirst = exports.monadIdentity = exports.chain = exports.applicativeIdentity = exports.of = exports.apSecond = exports.apFirst = exports.applyIdentity = exports.ap = exports.functorIdentity = exports.map = exports.getEq = exports.getShow = exports.URI = void 0;
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Identity';
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.getShow = function_1.identity;
/**
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return f(fa); }; };
/**
 * @since 3.0.0
 */
exports.functorIdentity = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) { return fab(fa); }; };
/**
 * @since 3.0.0
 */
exports.applyIdentity = {
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
 * @since 3.0.0
 */
exports.of = function_1.identity;
/**
 * @since 3.0.0
 */
exports.applicativeIdentity = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) { return f(ma); }; };
/**
 * @since 3.0.0
 */
exports.monadIdentity = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
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
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.reduce = function (b, f) { return function (fa) { return f(b, fa); }; };
/**
 * @since 2.0.0
 */
exports.foldMap = function () { return function (f) { return function (fa) { return f(fa); }; }; };
/**
 * @since 2.0.0
 */
exports.reduceRight = function (b, f) { return function (fa) { return f(fa, b); }; };
/**
 * @since 3.0.0
 */
exports.foldableIdentity = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @since 2.0.0
 */
exports.alt = function () { return function_1.identity; };
/**
 * @since 3.0.0
 */
exports.altIdentity = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @since 2.0.0
 */
exports.extend = function (f) { return function (wa) { return f(wa); }; };
/**
 * @since 3.0.0
 */
exports.extendIdentity = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @since 2.6.2
 */
exports.extract = function_1.identity;
/**
 * @since 3.0.0
 */
exports.comonadIdentity = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend,
    extract: exports.extract
};
/**
 * @since 3.0.0
 */
exports.traverse = function (F) { return function (f) { return function (ta) { return function_1.pipe(f(ta), F.map(function_1.identity)); }; }; };
/**
 * @since 3.0.0
 */
exports.sequence = function (F) { return function (ta) {
    return function_1.pipe(ta, F.map(function_1.identity));
}; };
/**
 * @since 3.0.0
 */
exports.traversableIdentity = {
    URI: exports.URI,
    map: exports.map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: exports.traverse,
    sequence: exports.sequence
};

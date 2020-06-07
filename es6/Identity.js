import { identity as id, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'Identity';
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var getShow = id;
/**
 * @since 2.0.0
 */
export var getEq = id;
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return f(fa); }; };
/**
 * @since 3.0.0
 */
export var functorIdentity = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return fab(fa); }; };
/**
 * @since 3.0.0
 */
export var applyIdentity = {
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
export var of = id;
/**
 * @since 3.0.0
 */
export var applicativeIdentity = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return f(ma); }; };
/**
 * @since 3.0.0
 */
export var monadIdentity = {
    URI: URI,
    map: map,
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
export var flatten = chain(id);
/**
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) { return f(b, fa); }; };
/**
 * @since 2.0.0
 */
export var foldMap = function () { return function (f) { return function (fa) { return f(fa); }; }; };
/**
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) { return f(fa, b); }; };
/**
 * @since 3.0.0
 */
export var foldableIdentity = {
    URI: URI,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight
};
/**
 * @since 2.0.0
 */
export var alt = function () { return id; };
/**
 * @since 3.0.0
 */
export var altIdentity = {
    URI: URI,
    map: map,
    alt: alt
};
/**
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) { return f(wa); }; };
/**
 * @since 3.0.0
 */
export var extendIdentity = {
    URI: URI,
    map: map,
    extend: extend
};
/**
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
extend(id);
/**
 * @since 2.6.2
 */
export var extract = id;
/**
 * @since 3.0.0
 */
export var comonadIdentity = {
    URI: URI,
    map: map,
    extend: extend,
    extract: extract
};
/**
 * @since 3.0.0
 */
export var traverse = function (F) { return function (f) { return function (ta) { return pipe(f(ta), F.map(id)); }; }; };
/**
 * @since 3.0.0
 */
export var sequence = function (F) { return function (ta) {
    return pipe(ta, F.map(id));
}; };
/**
 * @since 3.0.0
 */
export var traversableIdentity = {
    URI: URI,
    map: map,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};

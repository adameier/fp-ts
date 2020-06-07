"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traversableReadonlyTuple = exports.foldableReadonlyTuple = exports.comonadReadonlyTuple = exports.extendReadonlyTuple = exports.bifunctorReadonlyTuple = exports.semigroupoidReadonlyTuple = exports.sequence = exports.traverse = exports.reduceRight = exports.reduce = exports.mapLeft = exports.map = exports.foldMap = exports.extract = exports.duplicate = exports.extend = exports.pipe = exports.bimap = exports.getMonad = exports.getApplicative = exports.getApply = exports.swap = exports.snd = exports.fst = exports.URI = void 0;
var F = require("./function");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyTuple';
/**
 * @since 2.5.0
 */
function fst(sa) {
    return sa[0];
}
exports.fst = fst;
/**
 * @since 2.5.0
 */
function snd(sa) {
    return sa[1];
}
exports.snd = snd;
/**
 * @since 2.5.0
 */
function swap(sa) {
    return [snd(sa), fst(sa)];
}
exports.swap = swap;
/**
 * @since 2.5.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: function (fa) { return function (fab) { return [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]; }; }
    };
}
exports.getApply = getApply;
var of = function (M) { return function (a) {
    return [a, M.empty];
}; };
/**
 * @since 2.5.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: exports.URI,
        _E: A._E,
        map: A.map,
        ap: A.ap,
        of: of(M)
    };
}
exports.getApplicative = getApplicative;
/**
 * @since 2.5.0
 */
function getMonad(M) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        chain: function (f) { return function (ma) {
            var _a = f(fst(ma)), b = _a[0], s = _a[1];
            return [b, M.concat(snd(ma), s)];
        }; },
        of: of(M)
    };
}
exports.getMonad = getMonad;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.bimap = function (f, g) { return function (fea) { return [g(fst(fea)), f(snd(fea))]; }; };
/**
 * @since 3.0.0
 */
exports.pipe = function (fbc) { return function (fab) { return [
    fst(fbc),
    snd(fab)
]; }; };
/**
 * @since 2.5.0
 */
exports.extend = function (f) { return function (wa) { return [f(wa), snd(wa)]; }; };
/**
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(F.identity);
/**
 * @since 2.6.2
 */
exports.extract = fst;
/**
 * @since 2.5.0
 */
exports.foldMap = function () { return function (f) { return function (fa) {
    return f(fst(fa));
}; }; };
/**
 * @since 2.5.0
 */
exports.map = function (f) { return function (fa) { return [
    f(fst(fa)),
    snd(fa)
]; }; };
/**
 * @since 2.5.0
 */
exports.mapLeft = function (f) { return function (fea) { return [
    fst(fea),
    f(snd(fea))
]; }; };
/**
 * @since 2.5.0
 */
exports.reduce = function (b, f) { return function (fa) {
    return f(b, fst(fa));
}; };
/**
 * @since 2.5.0
 */
exports.reduceRight = function (b, f) { return function (fa) {
    return f(fst(fa), b);
}; };
/**
 * @since 3.0.0
 */
exports.traverse = function (A) { return function (f) { return function (as) {
    return F.pipe(f(fst(as)), A.map(function (b) { return [b, snd(as)]; }));
}; }; };
/**
 * @since 3.0.0
 */
exports.sequence = function (A) { return function (fas) {
    return F.pipe(fst(fas), A.map(function (a) { return [a, snd(fas)]; }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.semigroupoidReadonlyTuple = {
    URI: exports.URI,
    pipe: exports.pipe
};
/**
 * @since 3.0.0
 */
exports.bifunctorReadonlyTuple = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 3.0.0
 */
exports.extendReadonlyTuple = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @since 3.0.0
 */
exports.comonadReadonlyTuple = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend,
    extract: exports.extract
};
/**
 * @since 3.0.0
 */
exports.foldableReadonlyTuple = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @since 3.0.0
 */
exports.traversableReadonlyTuple = {
    URI: exports.URI,
    map: exports.map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: exports.traverse,
    sequence: exports.sequence
};

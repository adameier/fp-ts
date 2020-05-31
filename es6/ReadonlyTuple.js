import * as F from './function';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyTuple';
/**
 * @since 2.5.0
 */
export function fst(sa) {
    return sa[0];
}
/**
 * @since 2.5.0
 */
export function snd(sa) {
    return sa[1];
}
/**
 * @since 2.5.0
 */
export function swap(sa) {
    return [snd(sa), fst(sa)];
}
/**
 * @since 2.5.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: function (fa) { return function (fab) { return [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]; }; }
    };
}
var of = function (M) { return function (a) {
    return [a, M.empty];
}; };
/**
 * @since 2.5.0
 */
export function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI,
        _E: A._E,
        map: A.map,
        ap: A.ap,
        of: of(M)
    };
}
/**
 * @since 2.5.0
 */
export function getChain(S) {
    var A = getApply(S);
    return {
        URI: URI,
        _E: A._E,
        map: A.map,
        ap: A.ap,
        chain: function (f) { return function (ma) {
            var _a = f(fst(ma)), b = _a[0], s = _a[1];
            return [b, S.concat(snd(ma), s)];
        }; }
    };
}
/**
 * @since 2.5.0
 */
export function getMonad(M) {
    var C = getChain(M);
    return {
        URI: URI,
        _E: C._E,
        map: C.map,
        ap: C.ap,
        chain: C.chain,
        of: of(M)
    };
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
export var bimap = function (f, g) { return function (fea) { return [g(fst(fea)), f(snd(fea))]; }; };
/**
 * @since 3.0.0
 */
export var pipe = function (fbc) { return function (fab) { return [
    fst(fbc),
    snd(fab)
]; }; };
/**
 * @since 2.5.0
 */
export var extend = function (f) { return function (wa) { return [f(wa), snd(wa)]; }; };
/**
 * @since 2.5.0
 */
export var duplicate = 
/*#__PURE__*/
extend(F.identity);
/**
 * @since 2.6.2
 */
export var extract = fst;
/**
 * @since 2.5.0
 */
export var foldMap = function () { return function (f) { return function (fa) {
    return f(fst(fa));
}; }; };
/**
 * @since 2.5.0
 */
export var map = function (f) { return function (fa) { return [
    f(fst(fa)),
    snd(fa)
]; }; };
/**
 * @since 2.5.0
 */
export var mapLeft = function (f) { return function (fea) { return [
    fst(fea),
    f(snd(fea))
]; }; };
/**
 * @since 2.5.0
 */
export var reduce = function (b, f) { return function (fa) {
    return f(b, fst(fa));
}; };
/**
 * @since 2.5.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    return f(fst(fa), b);
}; };
/**
 * @since 3.0.0
 */
export var traverse = function (A) { return function (f) { return function (as) {
    return F.pipe(f(fst(as)), A.map(function (b) { return [b, snd(as)]; }));
}; }; };
/**
 * @since 3.0.0
 */
export var sequence = function (A) { return function (fas) {
    return F.pipe(fst(fas), A.map(function (a) { return [a, snd(fas)]; }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var semigroupoidReadonlyTuple = {
    URI: URI,
    pipe: pipe
};
/**
 * @since 3.0.0
 */
export var bifunctorReadonlyTuple = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 3.0.0
 */
export var extendReadonlyTuple = {
    URI: URI,
    map: map,
    extend: extend
};
/**
 * @since 3.0.0
 */
export var comonadReadonlyTuple = {
    URI: URI,
    map: map,
    extend: extend,
    extract: extract
};
/**
 * @since 3.0.0
 */
export var foldableReadonlyTuple = {
    URI: URI,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight
};
/**
 * @since 3.0.0
 */
export var traversableReadonlyTuple = {
    URI: URI,
    map: map,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};

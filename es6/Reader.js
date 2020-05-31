import * as F from './function';
import { monadIdentity } from './Identity';
import { getReaderM } from './ReaderT';
var MT = 
/*#__PURE__*/
getReaderM(monadIdentity);
/**
 * @since 2.0.0
 */
export var URI = 'Reader';
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export var ask = 
/*#__PURE__*/
(function () { return MT.ask; })();
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export var asks = 
/*#__PURE__*/
(function () { return MT.asks; })();
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export var local = 
/*#__PURE__*/
(function () { return MT.local; })();
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
/**
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
    };
}
/**
 * @since 2.0.0
 */
export var of = 
/*#__PURE__*/
(function () { return MT.of; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var map = 
/*#__PURE__*/
(function () { return MT.map; })();
/**
 * @since 3.0.0
 */
export var functorReader = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
/**
 * @since 3.0.0
 */
export var applyReader = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return F.pipe(fa, map(function (a) { return function (_) { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return F.pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 3.0.0
 */
export var applicativeReader = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
(function () { return MT.chain; })();
/**
 * @since 3.0.0
 */
export var monadReader = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return F.pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * @since 2.0.0
 */
export var flatten = chain(F.identity);
/**
 * @since 2.0.0
 */
export var promap = function (f, g) { return function (fea) { return function (a) { return g(fea(f(a))); }; }; };
/**
 * @since 3.0.0
 */
export var profunctorReader = {
    URI: URI,
    map: map,
    promap: promap
};
/**
 * @since 2.0.0
 */
export var pipe = function (fbc) { return function (fab) { return function (a) {
    return fbc(fab(a));
}; }; };
/**
 * @since 3.0.0
 */
export var semigroupoidReader = {
    URI: URI,
    pipe: pipe
};
/**
 * @since 3.0.0
 */
export var categoryReader = {
    URI: URI,
    pipe: pipe,
    id: function () { return F.identity; }
};

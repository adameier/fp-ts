"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bifunctorConst = exports.mapLeft = exports.bimap = exports.contravariantConst = exports.contramap = exports.functorConst = exports.map = exports.getApplicative = exports.getApply = exports.getBooleanAlgebra = exports.getHeytingAlgebra = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBounded = exports.getOrd = exports.getEq = exports.getShow = exports.make = exports.URI = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.URI = 'Const';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.make = function_1.unsafeCoerce;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getOrd = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getBounded = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getSemigroup = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getMonoid = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getSemiring = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getRing = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getHeytingAlgebra = function_1.identity;
/**
 * @since 2.6.0
 */
exports.getBooleanAlgebra = function_1.identity;
/**
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: function (fa) { return function (fab) { return exports.make(S.concat(fab, fa)); }; }
    };
}
exports.getApply = getApply;
/**
 * @since 2.0.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: exports.URI,
        _E: A._E,
        map: A.map,
        ap: A.ap,
        of: function () { return exports.make(M.empty); }
    };
}
exports.getApplicative = getApplicative;
/**
 * @since 2.0.0
 */
exports.map = function () { return function_1.unsafeCoerce; };
/**
 * @since 3.0.0
 */
exports.functorConst = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.contramap = function () { return function_1.unsafeCoerce; };
/**
 * @since 3.0.0
 */
exports.contravariantConst = {
    URI: exports.URI,
    contramap: exports.contramap
};
/**
 * @since 2.6.2
 */
exports.bimap = function (f) { return function (fea) {
    return exports.make(f(fea));
}; };
/**
 * @since 2.6.2
 */
exports.mapLeft = function (f) { return function (fea) { return exports.make(f(fea)); }; };
/**
 * @since 3.0.0
 */
exports.bifunctorConst = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};

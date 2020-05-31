import { identity, unsafeCoerce } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'Const';
/**
 * @since 2.0.0
 */
export var make = unsafeCoerce;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
/**
 * @since 2.0.0
 */
export var getEq = identity;
/**
 * @since 2.6.0
 */
export var getOrd = identity;
/**
 * @since 2.6.0
 */
export var getBounded = identity;
/**
 * @since 2.6.0
 */
export var getSemigroup = identity;
/**
 * @since 2.6.0
 */
export var getMonoid = identity;
/**
 * @since 2.6.0
 */
export var getSemiring = identity;
/**
 * @since 2.6.0
 */
export var getRing = identity;
/**
 * @since 2.6.0
 */
export var getHeytingAlgebra = identity;
/**
 * @since 2.6.0
 */
export var getBooleanAlgebra = identity;
/**
 * @since 2.0.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: function (fa) { return function (fab) { return make(S.concat(fab, fa)); }; }
    };
}
/**
 * @since 2.0.0
 */
export function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI,
        _E: A._E,
        map: A.map,
        ap: A.ap,
        of: function () { return make(M.empty); }
    };
}
/**
 * @since 2.0.0
 */
export var map = function () { return unsafeCoerce; };
/**
 * @since 3.0.0
 */
export var functorConst = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var contramap = function () { return unsafeCoerce; };
/**
 * @since 3.0.0
 */
export var contravariantConst = {
    URI: URI,
    contramap: contramap
};
/**
 * @since 2.6.2
 */
export var bimap = function (f) { return function (fea) {
    return make(f(fea));
}; };
/**
 * @since 2.6.2
 */
export var mapLeft = function (f) { return function (fea) { return make(f(fea)); }; };
/**
 * @since 3.0.0
 */
export var bifunctorConst = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};

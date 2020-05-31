import * as T from './Task';
import * as TH from './These';
import { getTheseM } from './TheseT';
var MT = 
/*#__PURE__*/
getTheseM(T.monadTask);
/**
 * @since 2.4.0
 */
export var URI = 'TaskThese';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export var left = 
/*#__PURE__*/
(function () { return MT.left; })();
/**
 * @since 2.4.0
 */
export var right = 
/*#__PURE__*/
(function () { return MT.right; })();
/**
 * @since 2.4.0
 */
export var both = 
/*#__PURE__*/
(function () { return MT.both; })();
/**
 * @since 2.4.0
 */
export function rightIO(ma) {
    return rightTask(T.fromIO(ma));
}
/**
 * @since 2.4.0
 */
export function leftIO(me) {
    return leftTask(T.fromIO(me));
}
/**
 * @since 2.4.0
 */
export var leftTask = 
/*#__PURE__*/
(function () { return MT.leftM; })();
/**
 * @since 2.4.0
 */
export var rightTask = 
/*#__PURE__*/
(function () { return MT.rightM; })();
/**
 * @since 2.4.0
 */
export var fromIOEither = 
/*#__PURE__*/
(function () { return T.fromIO; })();
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export var fold = 
/*#__PURE__*/
(function () { return MT.fold; })();
/* tslint:disable:readonly-array */
/**
 * @since 3.0.0
 */
export var toTuple = 
/*#__PURE__*/
(function () { return MT.toTuple; })();
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export var swap = 
/*#__PURE__*/
(function () { return MT.swap; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export function getSemigroup(SE, SA) {
    return T.getSemigroup(TH.getSemigroup(SE, SA));
}
/**
 * @since 2.4.0
 */
export var map = 
/*#__PURE__*/
(function () { return MT.map; })();
/**
 * @since 3.0.0
 */
export var functorTaskThese = {
    URI: URI,
    map: map
};
/**
 * @since 2.4.0
 */
export var bimap = 
/*#__PURE__*/
(function () { return MT.bimap; })();
/**
 * @since 2.4.0
 */
export var mapLeft = 
/*#__PURE__*/
(function () { return MT.mapLeft; })();
/**
 * @since 3.0.0
 */
export var bifunctorTaskThese = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 2.4.0
 */
export function getMonad(S) {
    var _ = MT.getMonad(S);
    return {
        URI: URI,
        _E: _._E,
        map: _.map,
        ap: _.ap,
        of: _.of,
        chain: _.chain,
        fromIO: rightIO,
        fromTask: rightTask
    };
}

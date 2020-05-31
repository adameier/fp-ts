"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonad = exports.bifunctorTaskThese = exports.mapLeft = exports.bimap = exports.functorTaskThese = exports.map = exports.getSemigroup = exports.swap = exports.toTuple = exports.fold = exports.fromIOEither = exports.rightTask = exports.leftTask = exports.leftIO = exports.rightIO = exports.both = exports.right = exports.left = exports.URI = void 0;
var T = require("./Task");
var TH = require("./These");
var TheseT_1 = require("./TheseT");
var MT = 
/*#__PURE__*/
TheseT_1.getTheseM(T.monadTask);
/**
 * @since 2.4.0
 */
exports.URI = 'TaskThese';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
exports.left = 
/*#__PURE__*/
(function () { return MT.left; })();
/**
 * @since 2.4.0
 */
exports.right = 
/*#__PURE__*/
(function () { return MT.right; })();
/**
 * @since 2.4.0
 */
exports.both = 
/*#__PURE__*/
(function () { return MT.both; })();
/**
 * @since 2.4.0
 */
function rightIO(ma) {
    return exports.rightTask(T.fromIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.4.0
 */
function leftIO(me) {
    return exports.leftTask(T.fromIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.4.0
 */
exports.leftTask = 
/*#__PURE__*/
(function () { return MT.leftM; })();
/**
 * @since 2.4.0
 */
exports.rightTask = 
/*#__PURE__*/
(function () { return MT.rightM; })();
/**
 * @since 2.4.0
 */
exports.fromIOEither = 
/*#__PURE__*/
(function () { return T.fromIO; })();
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
exports.fold = 
/*#__PURE__*/
(function () { return MT.fold; })();
/* tslint:disable:readonly-array */
/**
 * @since 3.0.0
 */
exports.toTuple = 
/*#__PURE__*/
(function () { return MT.toTuple; })();
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
exports.swap = 
/*#__PURE__*/
(function () { return MT.swap; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
function getSemigroup(SE, SA) {
    return T.getSemigroup(TH.getSemigroup(SE, SA));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.4.0
 */
exports.map = 
/*#__PURE__*/
(function () { return MT.map; })();
/**
 * @since 3.0.0
 */
exports.functorTaskThese = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.4.0
 */
exports.bimap = 
/*#__PURE__*/
(function () { return MT.bimap; })();
/**
 * @since 2.4.0
 */
exports.mapLeft = 
/*#__PURE__*/
(function () { return MT.mapLeft; })();
/**
 * @since 3.0.0
 */
exports.bifunctorTaskThese = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 2.4.0
 */
function getMonad(S) {
    var _ = MT.getMonad(S);
    return {
        URI: exports.URI,
        _E: _._E,
        map: _.map,
        ap: _.ap,
        of: _.of,
        chain: _.chain,
        fromIO: rightIO,
        fromTask: exports.rightTask
    };
}
exports.getMonad = getMonad;

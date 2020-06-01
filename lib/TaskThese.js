"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonad = exports.bifunctorTaskThese = exports.mapLeft = exports.bimap = exports.functorTaskThese = exports.map = exports.getSemigroup = exports.swap = exports.toTuple = exports.fold = exports.fromIOEither = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.both = exports.right = exports.left = exports.URI = void 0;
var function_1 = require("./function");
var T = require("./Task");
var TH = require("./These");
var TheseT = require("./TheseT");
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
exports.left = function_1.flow(TH.left, T.of);
/**
 * @since 2.4.0
 */
exports.right = function_1.flow(TH.right, T.of);
/**
 * @since 2.4.0
 */
exports.both = function_1.flow(TH.both, T.of);
/**
 * @since 2.4.0
 */
exports.rightTask = T.map(TH.right);
/**
 * @since 2.4.0
 */
exports.leftTask = T.map(TH.left);
/**
 * @since 2.4.0
 */
exports.rightIO = function_1.flow(T.fromIO, exports.rightTask);
/**
 * @since 2.4.0
 */
exports.leftIO = function_1.flow(T.fromIO, exports.leftTask);
/**
 * @since 2.4.0
 */
exports.fromIOEither = T.fromIO;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
exports.fold = function_1.flow(TH.fold, T.chain);
/* tslint:disable:readonly-array */
/**
 * @since 3.0.0
 */
exports.toTuple = function_1.flow(TH.toTuple, T.map);
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
exports.swap = 
/*#__PURE__*/
T.map(TH.swap);
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
exports.map = function (f) { return T.map(TH.map(f)); };
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
exports.bimap = function (f, g) {
    return T.map(TH.bimap(f, g));
};
/**
 * @since 2.4.0
 */
exports.mapLeft = function (f) {
    return T.map(TH.mapLeft(f));
};
/**
 * @since 3.0.0
 */
exports.bifunctorTaskThese = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 3.0.0
 */
function getMonad(S) {
    var chain = TheseT.chain(T.monadTask)(S);
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: function (fa) { return function (fab) {
            return function_1.pipe(fab, chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
        }; },
        of: exports.right,
        chain: chain
    };
}
exports.getMonad = getMonad;

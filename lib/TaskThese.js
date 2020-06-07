"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonad = exports.getApplicativeSeq = exports.getApplicativePar = exports.bifunctorTaskThese = exports.mapLeft = exports.bimap = exports.functorTaskThese = exports.map = exports.getSemigroup = exports.swap = exports.toTuple = exports.fold = exports.fromIOEither = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.both = exports.right = exports.left = exports.URI = void 0;
var function_1 = require("./function");
var T = require("./Task");
var TH = require("./These");
var Apply_1 = require("./Apply");
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
/**
 * @since 3.0.0
 */
exports.toTuple = function_1.flow(TH.toTuple, T.map);
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
var of = exports.right;
/**
 * @since 3.0.0
 */
function getApplicativePar(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: Apply_1.apComposition(T.applicativeTaskPar, TH.getApplicative(S)),
        of: of
    };
}
exports.getApplicativePar = getApplicativePar;
/**
 * @since 3.0.0
 */
function getApplicativeSeq(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: Apply_1.apComposition(T.applicativeTaskSeq, TH.getApplicative(S)),
        of: of
    };
}
exports.getApplicativeSeq = getApplicativeSeq;
/**
 * @since 3.0.0
 */
function getMonad(S) {
    var chain = function (f) {
        return T.chain(TH.fold(exports.left, f, function (e1, a) {
            return function_1.pipe(f(a), T.map(TH.fold(function (e2) { return TH.left(S.concat(e1, e2)); }, TH.right, function (e2, b) { return TH.both(S.concat(e1, e2), b); })));
        }));
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        of: of,
        chain: chain
    };
}
exports.getMonad = getMonad;

import { apComposition } from './Apply';
import { flow, pipe } from './function';
import * as T from './Task';
import * as TH from './These';
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
flow(TH.left, T.of);
/**
 * @since 2.4.0
 */
export var right = 
/*#__PURE__*/
flow(TH.right, T.of);
/**
 * @since 2.4.0
 */
export var both = 
/*#__PURE__*/
flow(TH.both, T.of);
/**
 * @since 2.4.0
 */
export var rightTask = 
/*#__PURE__*/
T.map(TH.right);
/**
 * @since 2.4.0
 */
export var leftTask = 
/*#__PURE__*/
T.map(TH.left);
/**
 * @since 2.4.0
 */
export var rightIO = 
/*#__PURE__*/
flow(T.fromIO, rightTask);
/**
 * @since 2.4.0
 */
export var leftIO = 
/*#__PURE__*/
flow(T.fromIO, leftTask);
/**
 * @since 2.4.0
 */
export var fromIOEither = T.fromIO;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export var fold = flow(TH.fold, T.chain);
/**
 * @since 3.0.0
 */
export var toTuple = 
/*#__PURE__*/
flow(TH.toTuple, T.map);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.4.0
 */
export var swap = 
/*#__PURE__*/
T.map(TH.swap);
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
export var map = function (f) { return T.map(TH.map(f)); };
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
export var bimap = function (f, g) {
    return T.map(TH.bimap(f, g));
};
/**
 * @since 2.4.0
 */
export var mapLeft = function (f) {
    return T.map(TH.mapLeft(f));
};
/**
 * @since 3.0.0
 */
export var bifunctorTaskThese = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
var of = right;
/**
 * @since 3.0.0
 */
export function getApplicativePar(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: apComposition(T.applicativeTaskPar, TH.getApplicative(S)),
        of: of
    };
}
/**
 * @since 3.0.0
 */
export function getApplicativeSeq(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: apComposition(T.applicativeTaskSeq, TH.getApplicative(S)),
        of: of
    };
}
/**
 * @since 3.0.0
 */
export function getMonad(S) {
    var chain = function (f) {
        return T.chain(TH.fold(left, f, function (e1, a) {
            return pipe(f(a), T.map(TH.fold(function (e2) { return TH.left(S.concat(e1, e2)); }, TH.right, function (e2, b) { return TH.both(S.concat(e1, e2), b); })));
        }));
    };
    return {
        URI: URI,
        _E: undefined,
        map: map,
        of: of,
        chain: chain
    };
}

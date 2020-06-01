import { flow, pipe } from './function';
import * as T from './Task';
import * as TH from './These';
import * as TheseT from './TheseT';
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
export var left = flow(TH.left, T.of);
/**
 * @since 2.4.0
 */
export var right = flow(TH.right, T.of);
/**
 * @since 2.4.0
 */
export var both = flow(TH.both, T.of);
/**
 * @since 2.4.0
 */
export var rightTask = T.map(TH.right);
/**
 * @since 2.4.0
 */
export var leftTask = T.map(TH.left);
/**
 * @since 2.4.0
 */
export var rightIO = flow(T.fromIO, rightTask);
/**
 * @since 2.4.0
 */
export var leftIO = flow(T.fromIO, leftTask);
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
/* tslint:disable:readonly-array */
/**
 * @since 3.0.0
 */
export var toTuple = flow(TH.toTuple, T.map);
/* tslint:enable:readonly-array */
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
/**
 * @since 3.0.0
 */
export function getMonad(S) {
    var chain = TheseT.chain(T.monadTask)(S);
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: function (fa) { return function (fab) {
            return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
        }; },
        of: right,
        chain: chain
    };
}

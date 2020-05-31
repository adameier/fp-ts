import { monadIdentity } from './Identity';
import { getWriterM } from './WriterT';
var MT = 
/*#__PURE__*/
getWriterM(monadIdentity);
/**
 * @since 2.0.0
 */
export var URI = 'Writer';
// tslint:enable:readonly-array
/**
 * @since 2.0.0
 */
export var evalWriter = 
/*#__PURE__*/
(function () { return MT.evalWriter; })();
/**
 * @since 2.0.0
 */
export var execWriter = 
/*#__PURE__*/
(function () { return MT.execWriter; })();
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export var tell = 
/*#__PURE__*/
(function () { return MT.tell; })();
// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export var listen = 
/*#__PURE__*/
(function () { return MT.listen; })();
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export var pass = 
/*#__PURE__*/
(function () { return MT.pass; })();
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export function listens(f) {
    return function (fa) { return MT.listens(fa, f); };
}
// tslint:enable:readonly-array
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export function censor(f) {
    return function (fa) { return MT.censor(fa, f); };
}
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
export var functorWriter = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export function getMonad(M) {
    var _ = MT.getMonad(M);
    return {
        URI: URI,
        _E: undefined,
        map: _.map,
        ap: _.ap,
        of: _.of,
        chain: _.chain
    };
}

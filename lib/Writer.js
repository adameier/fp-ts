"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonad = exports.functorWriter = exports.map = exports.censor = exports.listens = exports.pass = exports.listen = exports.tell = exports.execWriter = exports.evalWriter = exports.URI = void 0;
var Identity_1 = require("./Identity");
var WriterT_1 = require("./WriterT");
var MT = 
/*#__PURE__*/
WriterT_1.getWriterM(Identity_1.monadIdentity);
/**
 * @since 2.0.0
 */
exports.URI = 'Writer';
// tslint:enable:readonly-array
/**
 * @since 2.0.0
 */
exports.evalWriter = 
/*#__PURE__*/
(function () { return MT.evalWriter; })();
/**
 * @since 2.0.0
 */
exports.execWriter = 
/*#__PURE__*/
(function () { return MT.execWriter; })();
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
exports.tell = 
/*#__PURE__*/
(function () { return MT.tell; })();
// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
exports.listen = 
/*#__PURE__*/
(function () { return MT.listen; })();
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
exports.pass = 
/*#__PURE__*/
(function () { return MT.pass; })();
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (fa) { return MT.listens(fa, f); };
}
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (fa) { return MT.censor(fa, f); };
}
exports.censor = censor;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = 
/*#__PURE__*/
(function () { return MT.map; })();
/**
 * @since 3.0.0
 */
exports.functorWriter = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
function getMonad(M) {
    var _ = MT.getMonad(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: _.map,
        ap: _.ap,
        of: _.of,
        chain: _.chain
    };
}
exports.getMonad = getMonad;

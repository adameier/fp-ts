"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadState = exports.applicativeState = exports.applyState = exports.functorState = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.of = exports.gets = exports.modify = exports.put = exports.get = exports.execState = exports.evalState = exports.URI = void 0;
/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
var Identity_1 = require("./Identity");
var StateT_1 = require("./StateT");
var function_1 = require("./function");
var MT = 
/*#__PURE__*/
StateT_1.getStateM(Identity_1.monadIdentity);
/**
 * @since 2.0.0
 */
exports.URI = 'State';
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
exports.evalState = 
/*#__PURE__*/
(function () { return MT.evalState; })();
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = 
/*#__PURE__*/
(function () { return MT.execState; })();
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = 
/*#__PURE__*/
(function () { return MT.get; })();
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = 
/*#__PURE__*/
(function () { return MT.put; })();
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = 
/*#__PURE__*/
(function () { return MT.modify; })();
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = 
/*#__PURE__*/
(function () { return MT.gets; })();
/**
 * @since 2.0.0
 */
exports.of = 
/*#__PURE__*/
(function () { return MT.of; })();
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function (_) { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.chain = 
/*#__PURE__*/
(function () { return MT.chain; })();
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.map = 
/*#__PURE__*/
(function () { return MT.map; })();
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorState = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 3.0.0
 */
exports.applicativeState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.monadState = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    chain: exports.chain
};

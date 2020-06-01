"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadState = exports.applicativeState = exports.applyState = exports.functorState = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.of = exports.gets = exports.modify = exports.put = exports.get = exports.execState = exports.evalState = exports.URI = void 0;
/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
var I = require("./Identity");
var StateT = require("./StateT");
var function_1 = require("./function");
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
StateT.evalState(I.monadIdentity);
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = 
/*#__PURE__*/
StateT.execState(I.monadIdentity);
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = 
/*#__PURE__*/
StateT.get(I.monadIdentity);
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = 
/*#__PURE__*/
StateT.put(I.monadIdentity);
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = 
/*#__PURE__*/
StateT.modify(I.monadIdentity);
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = 
/*#__PURE__*/
StateT.gets(I.monadIdentity);
/**
 * @since 2.0.0
 */
exports.of = 
/*#__PURE__*/
StateT.of(I.monadIdentity);
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
StateT.ap(I.monadIdentity);
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
StateT.chain(I.monadIdentity);
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
StateT.map(I.monadIdentity);
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

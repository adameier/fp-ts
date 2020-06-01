/**
 * The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.
 *
 * @since 2.0.0
 */
import * as I from './Identity';
import * as StateT from './StateT';
import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'State';
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
export var evalState = 
/*#__PURE__*/
StateT.evalState(I.monadIdentity);
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
export var execState = 
/*#__PURE__*/
StateT.execState(I.monadIdentity);
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = 
/*#__PURE__*/
StateT.get(I.monadIdentity);
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = 
/*#__PURE__*/
StateT.put(I.monadIdentity);
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = 
/*#__PURE__*/
StateT.modify(I.monadIdentity);
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = 
/*#__PURE__*/
StateT.gets(I.monadIdentity);
/**
 * @since 2.0.0
 */
export var of = 
/*#__PURE__*/
StateT.of(I.monadIdentity);
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
StateT.ap(I.monadIdentity);
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function (_) { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
StateT.chain(I.monadIdentity);
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
export var flatten = chain(identity);
/**
 * @since 2.0.0
 */
export var map = 
/*#__PURE__*/
StateT.map(I.monadIdentity);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorState = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyState = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 3.0.0
 */
export var applicativeState = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadState = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};

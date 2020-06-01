import { identity, pipe } from './function';
import * as RTE from './ReaderTaskEither';
import * as StateT from './StateT';
/**
 * @since 2.0.0
 */
export var URI = 'StateReaderTaskEither';
/* tslint:enable:readonly-array */
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export function run(ma, s, r) {
    return ma(s)(r)();
}
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export var evalState = 
/*#__PURE__*/
StateT.evalState(RTE.monadReaderTaskEither);
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export var execState = 
/*#__PURE__*/
StateT.execState(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromReaderTaskEither(RTE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
StateT.of(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
export function rightTask(ma) {
    return fromReaderTaskEither(RTE.rightTask(ma));
}
/**
 * @since 2.0.0
 */
export function leftTask(me) {
    return fromReaderTaskEither(RTE.leftTask(me));
}
/**
 * @since 2.0.0
 */
export function fromTaskEither(ma) {
    return fromReaderTaskEither(RTE.fromTaskEither(ma));
}
/**
 * @since 2.0.0
 */
export function rightReader(ma) {
    return fromReaderTaskEither(RTE.rightReader(ma));
}
/**
 * @since 2.0.0
 */
export function leftReader(me) {
    return fromReaderTaskEither(RTE.leftReader(me));
}
/**
 * @since 2.0.0
 */
export function fromIOEither(ma) {
    return fromReaderTaskEither(RTE.fromIOEither(ma));
}
/**
 * @since 2.0.0
 */
export function fromReaderEither(ma) {
    return fromReaderTaskEither(RTE.fromReaderEither(ma));
}
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return fromReaderTaskEither(RTE.rightIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return fromReaderTaskEither(RTE.leftIO(me));
}
/**
 * @since 2.0.0
 */
export var rightState = 
/*#__PURE__*/
StateT.fromState(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
export function leftState(me) {
    return function (s) { return RTE.left(me(s)[0]); };
}
/**
 * @since 2.0.0
 */
export var fromReaderTaskEither = 
/*#__PURE__*/
StateT.fromF(RTE.monadReaderTaskEither);
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = 
/*#__PURE__*/
StateT.get(RTE.monadReaderTaskEither);
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = 
/*#__PURE__*/
StateT.put(RTE.monadReaderTaskEither);
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = 
/*#__PURE__*/
StateT.modify(RTE.monadReaderTaskEither);
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = 
/*#__PURE__*/
StateT.gets(RTE.monadReaderTaskEither);
/**
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainEitherK(f) {
    return chain(fromEitherK(f));
}
/**
 * @since 2.4.0
 */
export function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIOEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainIOEitherK(f) {
    return chain(fromIOEitherK(f));
}
/**
 * @since 2.4.0
 */
export function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTaskEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainTaskEitherK(f) {
    return chain(fromTaskEitherK(f));
}
/**
 * @since 2.4.0
 */
export function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromReaderTaskEither(f.apply(void 0, a));
    };
}
/**
 * @since 2.4.0
 */
export function chainReaderTaskEitherK(f) {
    return chain(fromReaderTaskEitherK(f));
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.6.2
 */
export var alt = function (that) { return function (fa) { return function (s) {
    return pipe(fa(s), RTE.alt(function () { return that()(s); }));
}; }; };
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
StateT.ap(RTE.monadReaderTaskEither);
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
 * @since 2.6.2
 */
export var bimap = function (f, g) { return function (fea) { return function (s) {
    return pipe(fea(s), RTE.bimap(f, function (_a) {
        var a = _a[0], s = _a[1];
        return [g(a), s];
    }));
}; }; };
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
StateT.chain(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * @since 2.6.1
 */
export var chainEitherKW = chainEitherK;
/**
 * @since 2.6.1
 */
export var chainTaskEitherKW = chainTaskEitherK;
/**
 * @since 2.6.1
 */
export var chainReaderTaskEitherKW = chainReaderTaskEitherK;
/**
 * @since 2.6.1
 */
export var chainIOEitherKW = chainIOEitherK;
/**
 * @since 2.0.0
 */
export var flatten = chain(identity);
/**
 * @since 2.0.0
 */
export var map = 
/*#__PURE__*/
StateT.map(RTE.monadReaderTaskEither);
/**
 * @since 2.6.2
 */
export var mapLeft = function (f) { return function (fea) { return function (s) {
    return pipe(fea(s), RTE.mapLeft(f));
}; }; };
/**
 * @since 2.0.0
 */
export var fromEither = function (ma) {
    return ma._tag === 'Left' ? left(ma.left) : right(ma.right);
};
/**
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) { return (ma._tag === 'None' ? left(onNone()) : right(ma.value)); }; };
/**
 * @since 2.4.4
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) {
    return predicate(a) ? right(a) : left(onFalse(a));
}; };
/**
 * @since 2.4.4
 */
export var filterOrElse = function (predicate, onFalse) { return function (ma) {
    return pipe(ma, chain(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorStateReaderTaskEither = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap
};
var of = right;
/**
 * @since 3.0.0
 */
export var applicativeStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var bifunctorStateReaderTaskEither = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 3.0.0
 */
export var altStateReaderTaskEither = {
    URI: URI,
    map: map,
    alt: alt
};
var fromIO = rightIO;
/**
 * @since 3.0.0
 */
export var monadIOStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    fromIO: fromIO
};
var fromTask = rightTask;
/**
 * @since 3.0.0
 */
export var monadTaskStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    fromIO: fromIO,
    fromTask: fromTask
};
var throwError = left;
/**
 * @since 3.0.0
 */
export var monadThrowStateReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    throwError: throwError
};
/**
 * TODO
 * @since 3.0.0
 */
export var monadReaderTaskEitherSeq = {
    URI: URI,
    map: map,
    of: of,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; },
    chain: chain,
    bimap: bimap,
    mapLeft: mapLeft,
    alt: alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};

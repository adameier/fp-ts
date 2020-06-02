"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadReaderTaskEitherSeq = exports.monadThrowStateReaderTaskEither = exports.monadTaskStateReaderTaskEither = exports.monadIOStateReaderTaskEither = exports.altStateReaderTaskEither = exports.bifunctorStateReaderTaskEither = exports.monadStateReaderTaskEither = exports.applicativeStateReaderTaskEither = exports.applyStateReaderTaskEither = exports.functorStateReaderTaskEither = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.mapLeft = exports.map = exports.flatten = exports.chainIOEitherKW = exports.chainReaderTaskEitherKW = exports.chainTaskEitherKW = exports.chainEitherKW = exports.chainW = exports.chainFirst = exports.chain = exports.bimap = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.chainReaderTaskEitherK = exports.fromReaderTaskEitherK = exports.chainTaskEitherK = exports.fromTaskEitherK = exports.chainIOEitherK = exports.fromIOEitherK = exports.chainEitherK = exports.fromEitherK = exports.gets = exports.modify = exports.put = exports.get = exports.fromReaderTaskEither = exports.leftState = exports.rightState = exports.leftIO = exports.rightIO = exports.fromReaderEither = exports.fromIOEither = exports.leftReader = exports.rightReader = exports.fromTaskEither = exports.leftTask = exports.rightTask = exports.right = exports.left = exports.execute = exports.evaluate = exports.URI = void 0;
var function_1 = require("./function");
var RTE = require("./ReaderTaskEither");
var StateT = require("./StateT");
/**
 * @since 2.0.0
 */
exports.URI = 'StateReaderTaskEither';
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
exports.evaluate = 
/*#__PURE__*/
StateT.evaluate(RTE.monadReaderTaskEither);
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
exports.execute = 
/*#__PURE__*/
StateT.execute(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
function left(e) {
    return exports.fromReaderTaskEither(RTE.left(e));
}
exports.left = left;
/**
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
StateT.of(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
function rightTask(ma) {
    return exports.fromReaderTaskEither(RTE.rightTask(ma));
}
exports.rightTask = rightTask;
/**
 * @since 2.0.0
 */
function leftTask(me) {
    return exports.fromReaderTaskEither(RTE.leftTask(me));
}
exports.leftTask = leftTask;
/**
 * @since 2.0.0
 */
function fromTaskEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromTaskEither(ma));
}
exports.fromTaskEither = fromTaskEither;
/**
 * @since 2.0.0
 */
function rightReader(ma) {
    return exports.fromReaderTaskEither(RTE.rightReader(ma));
}
exports.rightReader = rightReader;
/**
 * @since 2.0.0
 */
function leftReader(me) {
    return exports.fromReaderTaskEither(RTE.leftReader(me));
}
exports.leftReader = leftReader;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @since 2.0.0
 */
function fromReaderEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromReaderEither(ma));
}
exports.fromReaderEither = fromReaderEither;
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.fromReaderTaskEither(RTE.rightIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.fromReaderTaskEither(RTE.leftIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.0.0
 */
exports.rightState = 
/*#__PURE__*/
StateT.fromState(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
function leftState(me) {
    return function (s) { return RTE.left(me(s)[0]); };
}
exports.leftState = leftState;
/**
 * @since 2.0.0
 */
exports.fromReaderTaskEither = 
/*#__PURE__*/
StateT.fromF(RTE.monadReaderTaskEither);
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = 
/*#__PURE__*/
StateT.get(RTE.monadReaderTaskEither);
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = 
/*#__PURE__*/
StateT.put(RTE.monadReaderTaskEither);
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = 
/*#__PURE__*/
StateT.modify(RTE.monadReaderTaskEither);
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = 
/*#__PURE__*/
StateT.gets(RTE.monadReaderTaskEither);
/**
 * @since 2.4.0
 */
function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromEither(f.apply(void 0, a));
    };
}
exports.fromEitherK = fromEitherK;
/**
 * @since 2.4.0
 */
function chainEitherK(f) {
    return exports.chain(fromEitherK(f));
}
exports.chainEitherK = chainEitherK;
/**
 * @since 2.4.0
 */
function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIOEither(f.apply(void 0, a));
    };
}
exports.fromIOEitherK = fromIOEitherK;
/**
 * @since 2.4.0
 */
function chainIOEitherK(f) {
    return exports.chain(fromIOEitherK(f));
}
exports.chainIOEitherK = chainIOEitherK;
/**
 * @since 2.4.0
 */
function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTaskEither(f.apply(void 0, a));
    };
}
exports.fromTaskEitherK = fromTaskEitherK;
/**
 * @since 2.4.0
 */
function chainTaskEitherK(f) {
    return exports.chain(fromTaskEitherK(f));
}
exports.chainTaskEitherK = chainTaskEitherK;
/**
 * @since 2.4.0
 */
function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromReaderTaskEither(f.apply(void 0, a));
    };
}
exports.fromReaderTaskEitherK = fromReaderTaskEitherK;
/**
 * @since 2.4.0
 */
function chainReaderTaskEitherK(f) {
    return exports.chain(fromReaderTaskEitherK(f));
}
exports.chainReaderTaskEitherK = chainReaderTaskEitherK;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.6.2
 */
exports.alt = function (that) { return function (fa) { return function (s) {
    return function_1.pipe(fa(s), RTE.alt(function () { return that()(s); }));
}; }; };
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
StateT.ap(RTE.monadReaderTaskEither);
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
 * @since 2.6.2
 */
exports.bimap = function (f, g) { return function (fea) { return function (s) {
    return function_1.pipe(fea(s), RTE.bimap(f, function (_a) {
        var a = _a[0], s = _a[1];
        return [g(a), s];
    }));
}; }; };
/**
 * @since 2.0.0
 */
exports.chain = 
/*#__PURE__*/
StateT.chain(RTE.monadReaderTaskEither);
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.6.0
 */
exports.chainW = exports.chain;
/**
 * @since 2.6.1
 */
exports.chainEitherKW = chainEitherK;
/**
 * @since 2.6.1
 */
exports.chainTaskEitherKW = chainTaskEitherK;
/**
 * @since 2.6.1
 */
exports.chainReaderTaskEitherKW = chainReaderTaskEitherK;
/**
 * @since 2.6.1
 */
exports.chainIOEitherKW = chainIOEitherK;
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.map = 
/*#__PURE__*/
StateT.map(RTE.monadReaderTaskEither);
/**
 * @since 2.6.2
 */
exports.mapLeft = function (f) { return function (fea) { return function (s) {
    return function_1.pipe(fea(s), RTE.mapLeft(f));
}; }; };
/**
 * @since 2.0.0
 */
exports.fromEither = function (ma) {
    return ma._tag === 'Left' ? left(ma.left) : exports.right(ma.right);
};
/**
 * @since 2.0.0
 */
exports.fromOption = function (onNone) { return function (ma) { return (ma._tag === 'None' ? left(onNone()) : exports.right(ma.value)); }; };
/**
 * @since 2.4.4
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) {
    return predicate(a) ? exports.right(a) : left(onFalse(a));
}; };
/**
 * @since 2.4.4
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return function_1.pipe(ma, exports.chain(function (a) { return (predicate(a) ? exports.right(a) : left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
var of = exports.right;
/**
 * @since 3.0.0
 */
exports.applicativeStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @since 3.0.0
 */
exports.monadStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.bifunctorStateReaderTaskEither = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 3.0.0
 */
exports.altStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
var fromIO = rightIO;
/**
 * @since 3.0.0
 */
exports.monadIOStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: fromIO
};
var fromTask = rightTask;
/**
 * @since 3.0.0
 */
exports.monadTaskStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: fromTask
};
var throwError = left;
/**
 * @since 3.0.0
 */
exports.monadThrowStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    throwError: throwError
};
/**
 * TODO
 * @since 3.0.0
 */
exports.monadReaderTaskEitherSeq = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; },
    chain: exports.chain,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft,
    alt: exports.alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};

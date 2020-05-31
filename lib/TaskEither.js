"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadTaskEitherSeq = exports.monadThrowTaskEither = exports.monadTaskTaskEither = exports.monadIOTaskEither = exports.altTaskEither = exports.alt = exports.bifunctorTaskEither = exports.mapLeft = exports.bimap = exports.flatten = exports.chainFirst = exports.chainIOEitherKW = exports.chainEitherKW = exports.chainW = exports.monadTaskEither = exports.chain = exports.applicativeTaskEither = exports.apSecond = exports.apFirst = exports.applyTaskEither = exports.ap = exports.functorTaskEither = exports.map = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.tryCatchK = exports.chainIOEitherK = exports.fromIOEitherK = exports.chainEitherK = exports.fromEitherK = exports.getFilterable = exports.getTaskValidation = exports.taskify = exports.bracket = exports.tryCatch = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.swap = exports.orElse = exports.getOrElseW = exports.getOrElse = exports.fold = exports.fromIOEither = exports.leftTask = exports.rightTask = exports.leftIO = exports.rightIO = exports.right = exports.left = exports.URI = void 0;
var E = require("./Either");
var EitherT = require("./EitherT");
var Filterable_1 = require("./Filterable");
var function_1 = require("./function");
var T = require("./Task");
var ValidationT_1 = require("./ValidationT");
var MT = 
/*#__PURE__*/
(function () { return EitherT.getEitherM(T.monadTask); })();
/**
 * @since 2.0.0
 */
exports.URI = 'TaskEither';
/**
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
(function () { return MT.left; })();
/**
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
(function () { return EitherT.of(T.applicativeTask); })();
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.rightTask(T.fromIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.leftTask(T.fromIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.0.0
 */
exports.rightTask = 
/*#__PURE__*/
(function () { return MT.rightM; })();
/**
 * @since 2.0.0
 */
exports.leftTask = 
/*#__PURE__*/
(function () { return MT.leftM; })();
/**
 * @since 2.0.0
 */
exports.fromIOEither = 
/*#__PURE__*/
(function () { return T.fromIO; })();
/**
 * @since 2.0.0
 */
exports.fold = 
/*#__PURE__*/
(function () { return MT.fold; })();
/**
 * @since 2.0.0
 */
exports.getOrElse = 
/*#__PURE__*/
(function () { return MT.getOrElse; })();
/**
 * @since 2.6.0
 */
exports.getOrElseW = exports.getOrElse;
/**
 * @since 2.0.0
 */
exports.orElse = 
/*#__PURE__*/
(function () { return MT.orElse; })();
/**
 * @since 2.0.0
 */
exports.swap = 
/*#__PURE__*/
(function () { return MT.swap; })();
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getSemigroup(S) {
    return T.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return T.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/lib/Either'
 * import { tryCatch } from 'fp-ts/lib/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @since 2.0.0
 */
function tryCatch(f, onRejected) {
    return function () { return f().then(E.right, function (reason) { return E.left(onRejected(reason)); }); };
}
exports.tryCatch = tryCatch;
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
function bracket(acquire, use, release) {
    return function_1.pipe(acquire, exports.chain(function (a) {
        return function_1.pipe(function_1.pipe(use(a), T.map(E.right)), exports.chain(function (e) {
            return function_1.pipe(release(a, e), exports.chain(function () { return (E.isLeft(e) ? exports.left(e.left) : of(e.right)); }));
        }));
    }));
}
exports.bracket = bracket;
function taskify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function () {
            return new Promise(function (resolve) {
                var cbResolver = function (e, r) { return (e != null ? resolve(E.left(e)) : resolve(E.right(r))); };
                f.apply(null, args.concat(cbResolver));
            });
        };
    };
}
exports.taskify = taskify;
/**
 * @since 2.0.0
 */
function getTaskValidation(S) {
    var V = ValidationT_1.getValidationM(S, T.monadTask);
    return {
        URI: exports.URI,
        _E: undefined,
        map: V.map,
        ap: V.ap,
        of: V.of,
        alt: V.alt
    };
}
exports.getTaskValidation = getTaskValidation;
/**
 * @since 2.1.0
 */
function getFilterable(M) {
    var F = Filterable_1.getFilterableComposition(T.monadTask, E.getWitherable(M));
    return {
        URI: exports.URI,
        _E: undefined,
        map: F.map,
        compact: F.compact,
        separate: F.separate,
        filter: F.filter,
        filterMap: F.filterMap,
        partition: F.partition,
        partitionMap: F.partitionMap
    };
}
exports.getFilterable = getFilterable;
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
        return exports.fromIOEither(f.apply(void 0, a));
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
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
function tryCatchK(f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
}
exports.tryCatchK = tryCatchK;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.fromEither = function (ma) {
    return E.isLeft(ma) ? exports.left(ma.left) : exports.right(ma.right);
};
/**
 * @since 2.0.0
 */
exports.fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? exports.left(onNone()) : exports.right(ma.value);
}; };
/**
 * @since 2.0.0
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return function_1.pipe(ma, exports.chain(function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = 
/*#__PURE__*/
(function () { return EitherT.map(T.functorTask); })();
/**
 * @since 3.0.0
 */
exports.functorTaskEither = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
/**
 * @since 3.0.0
 */
exports.applyTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
var of = exports.right;
/**
 * @since 3.0.0
 */
exports.applicativeTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @since 2.0.0
 */
exports.chain = 
/*#__PURE__*/
(function () { return EitherT.chain(T.monadTask); })();
/**
 * @since 3.0.0
 */
exports.monadTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain
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
exports.chainIOEitherKW = chainIOEitherK;
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
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.bimap = 
/*#__PURE__*/
(function () { return MT.bimap; })();
/**
 * @since 2.0.0
 */
exports.mapLeft = 
/*#__PURE__*/
(function () { return MT.mapLeft; })();
/**
 * @since 3.0.0
 */
exports.bifunctorTaskEither = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 2.0.0
 */
exports.alt = 
/*#__PURE__*/
(function () { return MT.alt; })();
/**
 * @since 3.0.0
 */
exports.altTaskEither = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
var fromIO = rightIO;
/**
 * @since 3.0.0
 */
exports.monadIOTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: fromIO
};
var fromTask = exports.rightTask;
/**
 * @since 3.0.0
 */
exports.monadTaskTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: fromTask
};
var throwError = exports.left;
/**
 * @since 3.0.0
 */
exports.monadThrowTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    throwError: throwError
};
/**
 * TODO
 * @since 2.0.0
 */
exports.monadTaskEitherSeq = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft,
    map: exports.map,
    of: of,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; },
    chain: exports.chain,
    alt: exports.alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};

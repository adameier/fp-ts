"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadReaderTaskEitherSeq = exports.monadThrowReaderTaskEither = exports.monadTaskReaderTaskEither = exports.monadIOReaderTaskEither = exports.altReaderTaskEither = exports.bifunctorReaderTaskEither = exports.monadReaderTaskEither = exports.applicativeReaderTaskEither = exports.applyReaderTaskEither = exports.functorReaderTaskEither = exports.chainIOEitherKW = exports.chainTaskEitherKW = exports.chainEitherKW = exports.chainW = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.mapLeft = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.bimap = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.chainTaskEitherK = exports.fromTaskEitherK = exports.chainIOEitherK = exports.fromIOEitherK = exports.chainEitherK = exports.fromEitherK = exports.getReaderTaskValidation = exports.bracket = exports.local = exports.asks = exports.ask = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.swap = exports.orElse = exports.getOrElseW = exports.getOrElse = exports.fold = exports.leftIO = exports.rightIO = exports.fromReaderEither = exports.fromIOEither = exports.leftReader = exports.rightReaderTask = exports.leftReaderTask = exports.rightReader = exports.fromTaskEither = exports.leftTask = exports.rightTask = exports.right = exports.left = exports.run = exports.URI = void 0;
var function_1 = require("./function");
var Reader_1 = require("./Reader");
var ReaderT_1 = require("./ReaderT");
var ReaderTask_1 = require("./ReaderTask");
var TE = require("./TaskEither");
var ValidationT_1 = require("./ValidationT");
var MT = 
/*#__PURE__*/
ReaderT_1.getReaderM(TE.monadTaskEither);
/**
 * @since 2.0.0
 */
exports.URI = 'ReaderTaskEither';
/**
 * @since 2.0.0
 */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
/**
 * @since 2.0.0
 */
function left(e) {
    return exports.fromTaskEither(TE.left(e));
}
exports.left = left;
/**
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
(function () { return MT.of; })();
/**
 * @since 2.0.0
 */
function rightTask(ma) {
    return exports.fromTaskEither(TE.rightTask(ma));
}
exports.rightTask = rightTask;
/**
 * @since 2.0.0
 */
function leftTask(me) {
    return exports.fromTaskEither(TE.leftTask(me));
}
exports.leftTask = leftTask;
/**
 * @since 2.0.0
 */
exports.fromTaskEither = 
/*#__PURE__*/
(function () { return MT.fromM; })();
/**
 * @since 2.0.0
 */
exports.rightReader = 
/*#__PURE__*/
(function () { return MT.fromReader; })();
/**
 * @since 2.5.0
 */
function leftReaderTask(me) {
    return function (r) { return TE.leftTask(me(r)); };
}
exports.leftReaderTask = leftReaderTask;
/**
 * @since 2.5.0
 */
function rightReaderTask(ma) {
    return function (r) { return TE.rightTask(ma(r)); };
}
exports.rightReaderTask = rightReaderTask;
/**
 * @since 2.0.0
 */
function leftReader(me) {
    return function (r) { return TE.left(me(r)); };
}
exports.leftReader = leftReader;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromTaskEither(TE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @since 2.0.0
 */
function fromReaderEither(ma) {
    return function (r) { return TE.fromEither(ma(r)); };
}
exports.fromReaderEither = fromReaderEither;
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.fromTaskEither(TE.rightIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.fromTaskEither(TE.leftIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return function (r) {
        return function_1.pipe(ma(r), TE.fold(function (e) { return onLeft(e)(r); }, function (a) { return onRight(a)(r); }));
    }; };
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
function getOrElse(onLeft) {
    return function (ma) { return function (r) { return TE.getOrElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
exports.getOrElse = getOrElse;
/**
 * @since 2.6.0
 */
exports.getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return function (r) { return TE.orElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
function swap(ma) {
    return function (e) { return TE.swap(ma(e)); };
}
exports.swap = swap;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getSemigroup(S) {
    return Reader_1.getSemigroup(TE.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return Reader_1.getSemigroup(TE.getApplySemigroup(S));
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
 * @since 2.0.0
 */
exports.ask = 
/*#__PURE__*/
(function () { return MT.ask; })();
/**
 * @since 2.0.0
 */
exports.asks = 
/*#__PURE__*/
(function () { return MT.asks; })();
/**
 * @since 2.0.0
 */
exports.local = MT.local;
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
function bracket(aquire, use, release) {
    return function (r) {
        return TE.bracket(aquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
exports.bracket = bracket;
/**
 * @since 2.3.0
 */
function getReaderTaskValidation(S) {
    var V = ValidationT_1.getValidationM(S, ReaderTask_1.monadReaderTask);
    return {
        URI: exports.URI,
        _E: undefined,
        map: V.map,
        ap: V.ap,
        of: V.of,
        alt: V.alt
    };
}
exports.getReaderTaskValidation = getReaderTaskValidation;
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
        return exports.fromTaskEither(f.apply(void 0, a));
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
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.alt = function (that) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), TE.alt(function () { return that()(r); }));
}; }; };
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
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
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
exports.bimap = function (f, g) { return function (fea) { return function (e) {
    return function_1.pipe(fea(e), TE.bimap(f, g));
}; }; };
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
/**
 * @since 2.0.0
 */
exports.mapLeft = function (f) { return function (fea) { return function (e) { return function_1.pipe(fea(e), TE.mapLeft(f)); }; }; };
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
 * @since 2.0.0
 */
exports.fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
exports.filterOrElse = function (predicate, onFalse) { return function (ma) {
    return function_1.pipe(ma, exports.chain(function (a) { return (predicate(a) ? exports.right(a) : left(onFalse(a))); }));
}; };
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
exports.chainIOEitherKW = chainIOEitherK;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorReaderTaskEither = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
var of = exports.right;
/**
 * @since 3.0.0
 */
exports.applicativeReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @since 3.0.0
 */
exports.monadReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.bifunctorReaderTaskEither = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 3.0.0
 */
exports.altReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @since 3.0.0
 */
exports.monadIOReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: rightIO
};
/**
 * @since 3.0.0
 */
exports.monadTaskReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    fromIO: rightIO,
    fromTask: rightTask
};
/**
 * @since 3.0.0
 */
exports.monadThrowReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain,
    throwError: left
};
/**
 * TODO
 * @since 2.0.0
 */
exports.monadReaderTaskEitherSeq = {
    URI: exports.URI,
    map: exports.map,
    of: exports.right,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; },
    chain: exports.chain,
    alt: exports.alt,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft,
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left
};

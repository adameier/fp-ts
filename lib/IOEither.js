"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadThrowIOEither = exports.monadIOIOEither = exports.altIOEither = exports.alt = exports.bifunctorIOEither = exports.mapLeft = exports.bimap = exports.flatten = exports.chainEitherKW = exports.chainW = exports.chainFirst = exports.monadIOEither = exports.chain = exports.applicativeIOEither = exports.of = exports.apSecond = exports.apFirst = exports.applyIOEither = exports.ap = exports.functorIOEither = exports.map = exports.fromEither = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.chainEitherK = exports.fromEitherK = exports.getFilterable = exports.getIOValidationAlt = exports.getIOValidationApplicative = exports.bracket = exports.tryCatch = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.swap = exports.orElse = exports.getOrElseW = exports.getOrElse = exports.fold = exports.leftIO = exports.rightIO = exports.right = exports.left = exports.URI = void 0;
var Apply_1 = require("./Apply");
var Compactable_1 = require("./Compactable");
var E = require("./Either");
var Filterable_1 = require("./Filterable");
var function_1 = require("./function");
var I = require("./IO");
var ValidationT = require("./ValidationT");
/**
 * @since 2.0.0
 */
exports.URI = 'IOEither';
/**
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(E.left, I.of);
/**
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(E.right, I.of);
/**
 * @since 2.0.0
 */
exports.rightIO = 
/*#__PURE__*/
I.map(E.right);
/**
 * @since 2.0.0
 */
exports.leftIO = 
/*#__PURE__*/
I.map(E.left);
/**
 * @since 2.0.0
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(E.fold, I.chain);
/**
 * @since 2.0.0
 */
exports.getOrElse = function (onLeft) {
    return I.chain(E.fold(onLeft, I.of));
};
/**
 * @since 2.6.0
 */
exports.getOrElseW = exports.getOrElse;
/**
 * @since 2.0.0
 */
exports.orElse = function (f) {
    return I.chain(E.fold(f, exports.right));
};
/**
 * @since 2.0.0
 */
exports.swap = 
/*#__PURE__*/
I.map(E.swap);
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getSemigroup(S) {
    return I.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return I.getSemigroup(E.getApplySemigroup(S));
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
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
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
exports.bracket = function (acquire, use, release) {
    return function_1.pipe(acquire, exports.chain(function (a) {
        return function_1.pipe(function_1.pipe(use(a), I.map(E.right)), exports.chain(function (e) {
            return function_1.pipe(release(a, e), exports.chain(function () { return (E.isLeft(e) ? exports.left(e.left) : exports.of(e.right)); }));
        }));
    }));
};
/**
 * @since 3.0.0
 */
function getIOValidationApplicative(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        ap: Apply_1.apComposition(I.applyIO, E.getValidationApplicative(S)),
        of: exports.of
    };
}
exports.getIOValidationApplicative = getIOValidationApplicative;
/**
 * @since 3.0.0
 */
function getIOValidationAlt(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        alt: ValidationT.alt(S, I.monadIO)
    };
}
exports.getIOValidationAlt = getIOValidationAlt;
/**
 * @since 2.1.0
 */
function getFilterable(M) {
    var F = E.getFilterable(M);
    var map = function_1.flow(F.map, I.map);
    var compact = I.map(F.compact);
    var separate = Compactable_1.separateComposition(I.monadIO, F);
    var filter = Filterable_1.filterComposition(I.monadIO, F);
    var filterMap = Filterable_1.filterMapComposition(I.monadIO, F);
    var partition = Filterable_1.partitionComposition(I.monadIO, F);
    var partitionMap = Filterable_1.partitionMapComposition(I.monadIO, F);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap
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
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
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
/**
 * @since 2.0.0
 */
exports.fromEither = function (ma) {
    return E.isLeft(ma) ? exports.left(ma.left) : exports.right(ma.right);
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.map = function (f) { return I.map(E.map(f)); };
/**
 * @since 3.0.0
 */
exports.functorIOEither = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 2.0.0
 */
exports.ap = 
/*#__PURE__*/
Apply_1.apComposition(I.applyIO, E.applyEither);
/**
 * @since 3.0.0
 */
exports.applyIOEither = {
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
/**
 * @since 3.0.0
 */
exports.of = exports.right;
/**
 * @since 3.0.0
 */
exports.applicativeIOEither = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 2.0.0
 */
exports.chain = function (f) {
    return I.chain(E.fold(exports.left, f));
};
/**
 * @since 3.0.0
 */
exports.monadIOEither = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain
};
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
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.bimap = 
/*#__PURE__*/
function_1.flow(E.bimap, I.map);
/**
 * @since 2.0.0
 */
exports.mapLeft = function (f) { return I.map(E.mapLeft(f)); };
/**
 * @since 3.0.0
 */
exports.bifunctorIOEither = {
    URI: exports.URI,
    bimap: exports.bimap,
    mapLeft: exports.mapLeft
};
/**
 * @since 2.0.0
 */
exports.alt = function (that) {
    return I.chain(E.fold(that, exports.right));
};
/**
 * @since 3.0.0
 */
exports.altIOEither = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
var fromIO = exports.rightIO;
/**
 * @since 3.0.0
 */
exports.monadIOIOEither = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
exports.monadThrowIOEither = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    throwError: exports.left
};

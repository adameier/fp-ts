"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterableTaskOption = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.compactableTaskOption = exports.separate = exports.compact = exports.alternativeTaskOption = exports.zero = exports.altTaskOption = exports.alt = exports.chainOptionK = exports.chainTaskK = exports.flatten = exports.chainFirst = exports.monadTaskOption = exports.chain = exports.applicativeTaskOptionSeq = exports.applicativeTaskOptionPar = exports.of = exports.apSecond = exports.apFirst = exports.applyTaskOption = exports.ap = exports.functorTaskOption = exports.map = exports.fromOptionK = exports.mapNullable = exports.toNullable = exports.toUndefined = exports.getOrElse = exports.fold = exports.tryCatch = exports.fromTaskEither = exports.fromNullable = exports.fromOption = exports.fromTask = exports.some = exports.none = exports.URI = void 0;
var Apply_1 = require("./Apply");
var Filterable_1 = require("./Filterable");
var function_1 = require("./function");
var O = require("./Option");
var T = require("./Task");
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.URI = 'TaskOption';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.none = 
/*#__PURE__*/
T.of(O.none);
/**
 * @since 3.0.0
 */
exports.some = 
/*#__PURE__*/
function_1.flow(O.some, T.of);
/**
 * @since 3.0.0
 */
exports.fromTask = 
/*#__PURE__*/
T.map(O.some);
/**
 * @since 3.0.0
 */
exports.fromOption = 
/*#__PURE__*/
T.of;
/**
 * @since 3.0.0
 */
exports.fromNullable = 
/*#__PURE__*/
function_1.flow(O.fromNullable, exports.fromOption);
/**
 * @since 3.0.0
 */
exports.fromTaskEither = 
/*#__PURE__*/
T.map(O.fromEither);
/**
 * @since 3.0.0
 */
function tryCatch(f) {
    return function () {
        return f().then(function (a) { return O.some(a); }, function () { return O.none; });
    };
}
exports.tryCatch = tryCatch;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.fold = function (onNone, onSome) { return T.chain(O.fold(onNone, onSome)); };
/**
 * @since 3.0.0
 */
exports.getOrElse = function (onNone) {
    return T.chain(O.fold(onNone, T.of));
};
/**
 * @since 3.0.0
 */
exports.toUndefined = 
/*#__PURE__*/
T.map(O.toUndefined);
/**
 * @since 3.0.0
 */
exports.toNullable = 
/*#__PURE__*/
T.map(O.toNullable);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
function mapNullable(f) {
    return T.map(O.mapNullable(f));
}
exports.mapNullable = mapNullable;
/**
 * @since 3.0.0
 */
function fromOptionK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromOption(f.apply(void 0, a));
    };
}
exports.fromOptionK = fromOptionK;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.map = function_1.flow(O.map, T.map);
/**
 * @since 3.0.0
 */
exports.functorTaskOption = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.ap = 
/*#__PURE__*/
Apply_1.apComposition(T.applyTask, O.applyOption);
/**
 * @since 3.0.0
 */
exports.applyTaskOption = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 3.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 3.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 3.0.0
 */
exports.of = 
/*#__PURE__*/
function_1.flow(O.of, T.of);
/**
 * @since 3.0.0
 */
exports.applicativeTaskOptionPar = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.applicativeTaskOptionSeq = {
    URI: exports.URI,
    map: exports.map,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; },
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.chain = function (f) {
    return T.chain(O.fold(function () { return exports.none; }, f));
};
/**
 * @since 3.0.0
 */
exports.monadTaskOption = {
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
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @since 3.0.0
 */
exports.chainTaskK = function (f) {
    return exports.chain(function_1.flow(f, exports.fromTask));
};
/**
 * @since 3.0.0
 */
exports.chainOptionK = function (f) {
    return T.map(O.chain(f));
};
/**
 * @since 3.0.0
 */
exports.alt = function (that) {
    return T.chain(O.fold(that, function_1.flow(O.some, T.of)));
};
/**
 * @since 3.0.0
 */
exports.altTaskOption = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @since 3.0.0
 */
exports.zero = function () { return exports.none; };
/**
 * @since 3.0.0
 */
exports.alternativeTaskOption = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    alt: exports.alt,
    zero: exports.zero
};
/**
 * @since 3.0.0
 */
exports.compact = 
/*#__PURE__*/
T.map(O.compact);
/**
 * @since 3.0.0
 */
exports.separate = function (fge) { return ({
    left: function_1.pipe(fge, exports.map(O.getLeft), exports.compact),
    right: function_1.pipe(fge, exports.map(O.getRight), exports.compact)
}); };
/**
 * @since 3.0.0
 */
exports.compactableTaskOption = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @since 3.0.0
 */
exports.filter = 
/*#__PURE__*/
Filterable_1.filterComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
exports.filterMap = 
/*#__PURE__*/
Filterable_1.filterMapComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
exports.partition = 
/*#__PURE__*/
Filterable_1.partitionComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
exports.partitionMap = 
/*#__PURE__*/
Filterable_1.partitionMapComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
exports.filterableTaskOption = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap
};

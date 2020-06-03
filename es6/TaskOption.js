import { apComposition } from './Apply';
import { filterComposition, filterMapComposition, partitionComposition, partitionMapComposition } from './Filterable';
import { flow, identity, pipe } from './function';
import * as O from './Option';
import * as T from './Task';
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var URI = 'TaskOption';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var none = 
/*#__PURE__*/
T.of(O.none);
/**
 * @since 3.0.0
 */
export var some = 
/*#__PURE__*/
flow(O.some, T.of);
/**
 * @since 3.0.0
 */
export var fromTask = 
/*#__PURE__*/
T.map(O.some);
/**
 * @since 3.0.0
 */
export var fromOption = 
/*#__PURE__*/
T.of;
/**
 * @since 3.0.0
 */
export var fromNullable = 
/*#__PURE__*/
flow(O.fromNullable, fromOption);
/**
 * @since 3.0.0
 */
export var fromTaskEither = 
/*#__PURE__*/
T.map(O.fromEither);
/**
 * @since 3.0.0
 */
export function tryCatch(f) {
    return function () {
        return f().then(function (a) { return O.some(a); }, function () { return O.none; });
    };
}
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var fold = function (onNone, onSome) { return T.chain(O.fold(onNone, onSome)); };
/**
 * @since 3.0.0
 */
export var getOrElse = function (onNone) {
    return T.chain(O.fold(onNone, T.of));
};
/**
 * @since 3.0.0
 */
export var toUndefined = 
/*#__PURE__*/
T.map(O.toUndefined);
/**
 * @since 3.0.0
 */
export var toNullable = 
/*#__PURE__*/
T.map(O.toNullable);
// -------------------------------------------------------------------------------------
// helpers
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export function mapNullable(f) {
    return T.map(O.mapNullable(f));
}
/**
 * @since 3.0.0
 */
export function fromOptionK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromOption(f.apply(void 0, a));
    };
}
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var map = flow(O.map, T.map);
/**
 * @since 3.0.0
 */
export var functorTaskOption = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var ap = 
/*#__PURE__*/
apComposition(T.applyTask, O.applyOption);
/**
 * @since 3.0.0
 */
export var applyTaskOption = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 3.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function () { return a; }; }), ap(fb));
}; };
/**
 * @since 3.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 3.0.0
 */
export var of = 
/*#__PURE__*/
flow(O.of, T.of);
/**
 * @since 3.0.0
 */
export var applicativeTaskOption = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var chain = function (f) {
    return T.chain(O.fold(function () { return none; }, f));
};
/**
 * @since 3.0.0
 */
export var monadTaskOption = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
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
export var flatten = 
/*#__PURE__*/
chain(identity);
/**
 * @since 3.0.0
 */
export var chainTaskK = function (f) {
    return chain(flow(f, fromTask));
};
/**
 * @since 3.0.0
 */
export var chainOptionK = function (f) {
    return T.map(O.chain(f));
};
/**
 * @since 3.0.0
 */
export var alt = function (that) {
    return T.chain(O.fold(that, flow(O.some, T.of)));
};
/**
 * @since 3.0.0
 */
export var altTaskOption = {
    URI: URI,
    map: map,
    alt: alt
};
/**
 * @since 3.0.0
 */
export var zero = function () { return none; };
/**
 * @since 3.0.0
 */
export var alternativeTaskOption = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    alt: alt,
    zero: zero
};
/**
 * @since 3.0.0
 */
export var compact = 
/*#__PURE__*/
T.map(O.compact);
/**
 * @since 3.0.0
 */
export var separate = function (fge) { return ({
    left: pipe(fge, map(O.getLeft), compact),
    right: pipe(fge, map(O.getRight), compact)
}); };
/**
 * @since 3.0.0
 */
export var compactableTaskOption = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @since 3.0.0
 */
export var filter = 
/*#__PURE__*/
filterComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
export var filterMap = 
/*#__PURE__*/
filterMapComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
export var partition = 
/*#__PURE__*/
partitionComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
export var partitionMap = 
/*#__PURE__*/
partitionMapComposition(T.functorTask, O.filterableOption);
/**
 * @since 3.0.0
 */
export var filterableTaskOption = {
    URI: URI,
    compact: compact,
    separate: separate,
    map: map,
    filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap
};

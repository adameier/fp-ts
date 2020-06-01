import { apComposition } from './Apply';
import * as E from './Either';
import * as EitherT from './EitherT';
import { getFilterableComposition } from './Filterable';
import { identity, pipe } from './function';
import * as T from './Task';
import * as ValidationT from './ValidationT';
/**
 * @since 2.0.0
 */
export var URI = 'TaskEither';
/**
 * @since 2.0.0
 */
export var left = 
/*#__PURE__*/
EitherT.left(T.monadTask);
/**
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
EitherT.right(T.monadTask);
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return rightTask(T.fromIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return leftTask(T.fromIO(me));
}
/**
 * @since 2.0.0
 */
export var rightTask = 
/*#__PURE__*/
T.map(E.right);
/**
 * @since 2.0.0
 */
export var leftTask = 
/*#__PURE__*/
T.map(E.left);
/**
 * @since 2.0.0
 */
export var fromIOEither = 
/*#__PURE__*/
(function () { return T.fromIO; })();
/**
 * @since 2.0.0
 */
export var fold = 
/*#__PURE__*/
EitherT.fold(T.monadTask);
/**
 * @since 2.0.0
 */
export var getOrElse = 
/*#__PURE__*/
EitherT.getOrElse(T.monadTask);
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export var orElse = 
/*#__PURE__*/
EitherT.orElse(T.monadTask);
/**
 * @since 2.0.0
 */
export var swap = 
/*#__PURE__*/
T.map(E.swap);
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return T.getSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return T.getSemigroup(E.getApplySemigroup(S));
}
/**
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
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
export function tryCatch(f, onRejected) {
    return function () { return f().then(E.right, function (reason) { return E.left(onRejected(reason)); }); };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket(acquire, use, release) {
    return pipe(acquire, chain(function (a) {
        return pipe(pipe(use(a), T.map(E.right)), chain(function (e) {
            return pipe(release(a, e), chain(function () { return (E.isLeft(e) ? left(e.left) : of(e.right)); }));
        }));
    }));
}
export function taskify(f) {
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
/**
 * @since 2.0.0
 */
export function getTaskValidation(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: apComposition(T.applicativeTask, E.getValidation(S)),
        of: of,
        alt: ValidationT.alt(S, T.monadTask)
    };
}
/**
 * @since 2.1.0
 */
export function getFilterable(M) {
    var F = getFilterableComposition(T.monadTask, E.getWitherable(M));
    return {
        URI: URI,
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
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @since 2.5.0
 */
export function tryCatchK(f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var fromEither = function (ma) {
    return E.isLeft(ma) ? left(ma.left) : right(ma.right);
};
/**
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
export var filterOrElse = function (predicate, onFalse) { return function (ma) {
    return pipe(ma, chain(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var map = function (f) { return T.map(E.map(f)); };
/**
 * @since 3.0.0
 */
export var functorTaskEither = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = EitherT.ap(T.monadTask);
/**
 * @since 3.0.0
 */
export var applyTaskEither = {
    URI: URI,
    map: map,
    ap: ap
};
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function () { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
var of = right;
/**
 * @since 3.0.0
 */
export var applicativeTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
EitherT.chain(T.monadTask);
/**
 * @since 3.0.0
 */
export var monadTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
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
export var chainIOEitherKW = chainIOEitherK;
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
 * @since 2.0.0
 */
export var bimap = 
/*#__PURE__*/
EitherT.bimap(T.monadTask);
/**
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/
EitherT.mapLeft(T.monadTask);
/**
 * @since 3.0.0
 */
export var bifunctorTaskEither = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 2.0.0
 */
export var alt = 
/*#__PURE__*/
EitherT.alt(T.monadTask);
/**
 * @since 3.0.0
 */
export var altTaskEither = {
    URI: URI,
    map: map,
    alt: alt
};
var fromIO = rightIO;
/**
 * @since 3.0.0
 */
export var monadIOTaskEither = {
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
export var monadTaskTaskEither = {
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
export var monadThrowTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    throwError: throwError
};
/**
 * TODO
 * @since 2.0.0
 */
export var monadTaskEitherSeq = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft,
    map: map,
    of: of,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; },
    chain: chain,
    alt: alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};

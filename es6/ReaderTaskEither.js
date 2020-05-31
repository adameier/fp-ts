import { identity, pipe } from './function';
import { getSemigroup as getReaderSemigroup } from './Reader';
import { getReaderM } from './ReaderT';
import { monadReaderTask } from './ReaderTask';
import * as TE from './TaskEither';
import { getValidationM } from './ValidationT';
var MT = 
/*#__PURE__*/
getReaderM(TE.monadTaskEither);
/**
 * @since 2.0.0
 */
export var URI = 'ReaderTaskEither';
/**
 * @since 2.0.0
 */
export function run(ma, r) {
    return ma(r)();
}
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromTaskEither(TE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
(function () { return MT.of; })();
/**
 * @since 2.0.0
 */
export function rightTask(ma) {
    return fromTaskEither(TE.rightTask(ma));
}
/**
 * @since 2.0.0
 */
export function leftTask(me) {
    return fromTaskEither(TE.leftTask(me));
}
/**
 * @since 2.0.0
 */
export var fromTaskEither = 
/*#__PURE__*/
(function () { return MT.fromM; })();
/**
 * @since 2.0.0
 */
export var rightReader = 
/*#__PURE__*/
(function () { return MT.fromReader; })();
/**
 * @since 2.5.0
 */
export function leftReaderTask(me) {
    return function (r) { return TE.leftTask(me(r)); };
}
/**
 * @since 2.5.0
 */
export function rightReaderTask(ma) {
    return function (r) { return TE.rightTask(ma(r)); };
}
/**
 * @since 2.0.0
 */
export function leftReader(me) {
    return function (r) { return TE.left(me(r)); };
}
/**
 * @since 2.0.0
 */
export function fromIOEither(ma) {
    return fromTaskEither(TE.fromIOEither(ma));
}
/**
 * @since 2.0.0
 */
export function fromReaderEither(ma) {
    return function (r) { return TE.fromEither(ma(r)); };
}
/**
 * @since 2.0.0
 */
export function rightIO(ma) {
    return fromTaskEither(TE.rightIO(ma));
}
/**
 * @since 2.0.0
 */
export function leftIO(me) {
    return fromTaskEither(TE.leftIO(me));
}
/**
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return function (r) {
        return pipe(ma(r), TE.fold(function (e) { return onLeft(e)(r); }, function (a) { return onRight(a)(r); }));
    }; };
}
/**
 * @since 2.0.0
 */
export function getOrElse(onLeft) {
    return function (ma) { return function (r) { return TE.getOrElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
/**
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return function (r) { return TE.orElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
/**
 * @since 2.0.0
 */
export function swap(ma) {
    return function (e) { return TE.swap(ma(e)); };
}
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return getReaderSemigroup(TE.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return getReaderSemigroup(TE.getApplySemigroup(S));
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
 * @since 2.0.0
 */
export var ask = 
/*#__PURE__*/
(function () { return MT.ask; })();
/**
 * @since 2.0.0
 */
export var asks = 
/*#__PURE__*/
(function () { return MT.asks; })();
/**
 * @since 2.0.0
 */
export var local = MT.local;
/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
export function bracket(aquire, use, release) {
    return function (r) {
        return TE.bracket(aquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
/**
 * @since 2.3.0
 */
export function getReaderTaskValidation(S) {
    var V = getValidationM(S, monadReaderTask);
    return {
        URI: URI,
        _E: undefined,
        map: V.map,
        ap: V.ap,
        of: V.of,
        alt: V.alt
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
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var alt = function (that) { return function (fa) { return function (r) {
    return pipe(fa(r), TE.alt(function () { return that()(r); }));
}; }; };
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/
(function () { return MT.ap; })();
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
/**
 * @since 2.0.0
 */
export var bimap = function (f, g) { return function (fea) { return function (e) {
    return pipe(fea(e), TE.bimap(f, g));
}; }; };
/**
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/
(function () { return MT.chain; })();
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
(function () { return MT.map; })();
/**
 * @since 2.0.0
 */
export var mapLeft = function (f) { return function (fea) { return function (e) { return pipe(fea(e), TE.mapLeft(f)); }; }; };
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
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
/**
 * @since 2.0.0
 */
export var filterOrElse = function (predicate, onFalse) { return function (ma) {
    return pipe(ma, chain(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }));
}; };
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
export var chainIOEitherKW = chainIOEitherK;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorReaderTaskEither = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap
};
var of = right;
/**
 * @since 3.0.0
 */
export var applicativeReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var bifunctorReaderTaskEither = {
    URI: URI,
    bimap: bimap,
    mapLeft: mapLeft
};
/**
 * @since 3.0.0
 */
export var altReaderTaskEither = {
    URI: URI,
    map: map,
    alt: alt
};
/**
 * @since 3.0.0
 */
export var monadIOReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    fromIO: rightIO
};
/**
 * @since 3.0.0
 */
export var monadTaskReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    fromIO: rightIO,
    fromTask: rightTask
};
/**
 * @since 3.0.0
 */
export var monadThrowReaderTaskEither = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain,
    throwError: left
};
/**
 * TODO
 * @since 2.0.0
 */
export var monadReaderTaskEitherSeq = {
    URI: URI,
    map: map,
    of: right,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; },
    chain: chain,
    alt: alt,
    bimap: bimap,
    mapLeft: mapLeft,
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left
};

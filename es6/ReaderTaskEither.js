import { apComposition } from './Apply';
import * as E from './Either';
import { flow, identity, pipe } from './function';
import * as R from './Reader';
import * as RT from './ReaderTask';
import * as TE from './TaskEither';
import * as ValidationT from './ValidationT';
/**
 * @since 2.0.0
 */
export var URI = 'ReaderTaskEither';
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromTaskEither(TE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = function (a) { return function () { return TE.right(a); }; };
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
R.of;
/**
 * @since 2.0.0
 */
export var rightReader = function (ma) { return function (r) {
    return TE.right(ma(r));
}; };
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
    return R.getSemigroup(TE.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return R.getSemigroup(TE.getApplySemigroup(S));
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
export var ask = function () { return TE.right; };
/**
 * @since 2.0.0
 */
export var asks = function (f) { return function (r) {
    return pipe(TE.right(r), TE.map(f));
}; };
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
 * @since 3.0.0
 */
export function getReaderTaskValidationApplicative(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        ap: apComposition(RT.applyReaderTask, E.getValidationApplicative(S)),
        of: of
    };
}
/**
 * @since 3.0.0
 */
export function getReaderTaskValidationAlt(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        alt: ValidationT.alt(S, RT.monadReaderTask)
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
export var chainEitherK = function (f) { return chain(function (a) { return fromEither(f(a)); }); };
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
export var chainIOEitherK = function (f) { return chain(function (a) { return fromIOEither(f(a)); }); };
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
export var chainTaskEitherK = function (f) { return chain(function (a) { return fromTaskEither(f(a)); }); };
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
export var ap = function (fa) { return function (fab) { return function (r) {
    return pipe(fab(r), TE.ap(fa(r)));
}; }; };
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
export var chain = function (f) { return function (fa) { return function (r) {
    return pipe(fa(r), TE.chain(function (a) { return f(a)(r); }));
}; }; };
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
export var map = function (f) { return function (fa) { return flow(fa, TE.map(f)); }; };
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
 * @category instances
 * @since 3.0.0
 */
export var applicativeReaderTaskEitherPar = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @category instances
 * @since 2.0.0
 */
export var applicativeReaderTaskEitherSeq = {
    URI: URI,
    map: map,
    of: right,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; }
};
/**
 * @since 3.0.0
 */
export var monadReaderTaskEither = {
    URI: URI,
    map: map,
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
    of: of,
    chain: chain,
    throwError: left
};

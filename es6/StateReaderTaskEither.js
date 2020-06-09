import { identity, pipe } from './function';
import * as RTE from './ReaderTaskEither';
/**
 * @since 2.0.0
 */
export var URI = 'StateReaderTaskEither';
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export var evaluate = function (s) { return function (fsa) {
    return pipe(fsa(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
}; };
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export var execute = function (s) { return function (fsa) {
    return pipe(fsa(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
}; };
/**
 * @since 2.0.0
 */
export function left(e) {
    return fromReaderTaskEither(RTE.left(e));
}
/**
 * @since 2.0.0
 */
export var right = function (a) { return function (s) {
    return RTE.right([a, s]);
}; };
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
export var rightState = function (sa) { return function (s) { return RTE.right(sa(s)); }; };
/**
 * @since 2.0.0
 */
export function leftState(me) {
    return function (s) { return RTE.left(me(s)[0]); };
}
/**
 * @since 2.0.0
 */
export var fromReaderTaskEither = function (fa) { return function (s) {
    return pipe(fa, RTE.map(function (a) { return [a, s]; }));
}; };
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = function () { return function (s) { return RTE.right([s, s]); }; };
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = function (s) { return function () {
    return RTE.right([undefined, s]);
}; };
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = function (f) { return function (s) {
    return RTE.right([undefined, f(s)]);
}; };
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = function (f) { return function (s) {
    return RTE.right([f(s), s]);
}; };
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
export var chainEitherK = function (f) {
    return chain(function (a) { return fromEither(f(a)); });
};
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
export var chainIOEitherK = function (f) {
    return chain(function (a) { return fromIOEither(f(a)); });
};
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
export var chainTaskEitherK = function (f) {
    return chain(function (a) { return fromTaskEither(f(a)); });
};
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
export var chainReaderTaskEitherK = function (f) {
    return chain(function (a) { return fromReaderTaskEither(f(a)); });
};
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
export var ap = function (fa) { return function (fab) { return function (s1) {
    return pipe(fab(s1), RTE.chain(function (_a) {
        var f = _a[0], s2 = _a[1];
        return pipe(fa(s2), RTE.map(function (_a) {
            var a = _a[0], s3 = _a[1];
            return [f(a), s3];
        }));
    }));
}; }; };
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
export var chain = function (f) { return function (ma) { return function (s1) {
    return pipe(ma(s1), RTE.chain(function (_a) {
        var a = _a[0], s2 = _a[1];
        return f(a)(s2);
    }));
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
export var flatten = 
/*#__PURE__*/
chain(identity);
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return function (s1) {
    return pipe(fa(s1), RTE.map(function (_a) {
        var a = _a[0], s2 = _a[1];
        return [f(a), s2];
    }));
}; }; };
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
 * @category instances
 * @since 3.0.0
 */
export var applicativeStateReaderTaskEitherPar = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @category instances
 * @since 3.0.0
 */
export var applicativeReaderTaskEitherSeq = {
    URI: URI,
    map: map,
    of: of,
    ap: function (fa) { return function (fab) {
        return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
    }; }
};
/**
 * @since 3.0.0
 */
export var monadStateReaderTaskEither = {
    URI: URI,
    map: map,
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
    of: of,
    chain: chain,
    throwError: throwError
};

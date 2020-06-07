"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadThrowStateReaderTaskEither = exports.monadTaskStateReaderTaskEither = exports.monadIOStateReaderTaskEither = exports.altStateReaderTaskEither = exports.bifunctorStateReaderTaskEither = exports.monadStateReaderTaskEither = exports.applicativeReaderTaskEitherSeq = exports.applicativeStateReaderTaskEitherPar = exports.applyStateReaderTaskEither = exports.functorStateReaderTaskEither = exports.filterOrElse = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.mapLeft = exports.map = exports.flatten = exports.chainIOEitherKW = exports.chainReaderTaskEitherKW = exports.chainTaskEitherKW = exports.chainEitherKW = exports.chainW = exports.chainFirst = exports.chain = exports.bimap = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.chainReaderTaskEitherK = exports.fromReaderTaskEitherK = exports.chainTaskEitherK = exports.fromTaskEitherK = exports.chainIOEitherK = exports.fromIOEitherK = exports.chainEitherK = exports.fromEitherK = exports.gets = exports.modify = exports.put = exports.get = exports.fromReaderTaskEither = exports.leftState = exports.rightState = exports.leftIO = exports.rightIO = exports.fromReaderEither = exports.fromIOEither = exports.leftReader = exports.rightReader = exports.fromTaskEither = exports.leftTask = exports.rightTask = exports.right = exports.left = exports.execute = exports.evaluate = exports.URI = void 0;
var function_1 = require("./function");
var RTE = require("./ReaderTaskEither");
/**
 * @since 2.0.0
 */
exports.URI = 'StateReaderTaskEither';
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
exports.evaluate = function (s) { return function (fsa) {
    return function_1.pipe(fsa(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
}; };
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
exports.execute = function (s) { return function (fsa) {
    return function_1.pipe(fsa(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
}; };
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
exports.right = function (a) { return function (s) {
    return RTE.right([a, s]);
}; };
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
exports.rightState = function (sa) { return function (s) { return RTE.right(sa(s)); }; };
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
exports.fromReaderTaskEither = function (fa) { return function (s) {
    return function_1.pipe(fa, RTE.map(function (a) { return [a, s]; }));
}; };
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = function () { return function (s) { return RTE.right([s, s]); }; };
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = function (s) { return function () {
    return RTE.right([undefined, s]);
}; };
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = function (f) { return function (s) {
    return RTE.right([undefined, f(s)]);
}; };
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = function (f) { return function (s) {
    return RTE.right([f(s), s]);
}; };
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
exports.chainEitherK = function (f) {
    return exports.chain(function (a) { return exports.fromEither(f(a)); });
};
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
exports.chainIOEitherK = function (f) {
    return exports.chain(function (a) { return fromIOEither(f(a)); });
};
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
exports.chainTaskEitherK = function (f) {
    return exports.chain(function (a) { return fromTaskEither(f(a)); });
};
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
exports.chainReaderTaskEitherK = function (f) {
    return exports.chain(function (a) { return exports.fromReaderTaskEither(f(a)); });
};
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
exports.ap = function (fa) { return function (fab) { return function (s1) {
    return function_1.pipe(fab(s1), RTE.chain(function (_a) {
        var f = _a[0], s2 = _a[1];
        return function_1.pipe(fa(s2), RTE.map(function (_a) {
            var a = _a[0], s3 = _a[1];
            return [f(a), s3];
        }));
    }));
}; }; };
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
exports.chain = function (f) { return function (ma) { return function (s1) {
    return function_1.pipe(ma(s1), RTE.chain(function (_a) {
        var a = _a[0], s2 = _a[1];
        return f(a)(s2);
    }));
}; }; };
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
exports.chainEitherKW = exports.chainEitherK;
/**
 * @since 2.6.1
 */
exports.chainTaskEitherKW = exports.chainTaskEitherK;
/**
 * @since 2.6.1
 */
exports.chainReaderTaskEitherKW = exports.chainReaderTaskEitherK;
/**
 * @since 2.6.1
 */
exports.chainIOEitherKW = exports.chainIOEitherK;
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return function (s1) {
    return function_1.pipe(fa(s1), RTE.map(function (_a) {
        var a = _a[0], s2 = _a[1];
        return [f(a), s2];
    }));
}; }; };
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
 * @category instances
 * @since 3.0.0
 */
exports.applicativeStateReaderTaskEitherPar = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeReaderTaskEitherSeq = {
    URI: exports.URI,
    map: exports.map,
    of: of,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; }
};
/**
 * @since 3.0.0
 */
exports.monadStateReaderTaskEither = {
    URI: exports.URI,
    map: exports.map,
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
    of: of,
    chain: exports.chain,
    throwError: throwError
};

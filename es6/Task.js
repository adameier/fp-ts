import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'Task';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export function delay(millis) {
    return function (ma) { return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    }; };
}
/**
 * @since 2.0.0
 */
export function fromIO(ma) {
    return function () { return Promise.resolve(ma()); };
}
/**
 * @since 2.4.0
 */
export function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var never = function () { return new Promise(function (_) { return undefined; }); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
/**
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
/**
 * Note: uses `Promise.race` internally
 *
 * @since 2.0.0
 */
export function getRaceMonoid() {
    return {
        concat: function (x, y) { return function () { return Promise.race([x(), y()]); }; },
        empty: never
    };
}
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return function () { return fa().then(f); }; }; };
/**
 * @since 3.0.0
 */
export var functorTask = {
    URI: URI,
    map: map
};
/**
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return function () {
    return Promise.all([fab(), fa()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    });
}; }; };
/**
 * @since 3.0.0
 */
export var applyTask = {
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
/**
 * @since 2.0.0
 */
export function of(a) {
    return function () { return Promise.resolve(a); };
}
/**
 * @category instances
 * @since 3.0.0
 */
export var applicativeTaskPar = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @category instances
 * @since 3.0.0
 */
export var applicativeTaskSeq = {
    URI: URI,
    map: map,
    ap: function (fa) { return function (fab) { return function () { return fab().then(function (f) { return fa().then(function (a) { return f(a); }); }); }; }; },
    of: of
};
/**
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return function () {
    return ma().then(function (a) { return f(a)(); });
}; }; };
/**
 * @since 3.0.0
 */
export var monadTask = {
    URI: URI,
    map: map,
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
 * @since 2.4.0
 */
export function chainIOK(f) {
    return chain(fromIOK(f));
}
/**
 * @since 3.0.0
 */
export var monadIOTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
export var monadTaskTask = {
    URI: URI,
    map: map,
    of: of,
    chain: chain,
    fromIO: fromIO,
    fromTask: identity
};

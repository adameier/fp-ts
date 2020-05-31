import { pipe } from './function';
export function getWriterM(M) {
    var map = function (f) { return function (fa) { return function () {
        return pipe(fa(), M.map(function (_a) {
            var a = _a[0], w = _a[1];
            return [f(a), w];
        }));
    }; }; };
    return {
        map: map,
        evalWriter: function (fa) {
            return pipe(fa(), M.map(function (_a) {
                var a = _a[0];
                return a;
            }));
        },
        execWriter: function (fa) {
            return pipe(fa(), M.map(function (_a) {
                var _ = _a[0], w = _a[1];
                return w;
            }));
        },
        tell: function (w) { return function () { return M.of([undefined, w]); }; },
        listen: function (fa) { return function () {
            return pipe(fa(), M.map(function (_a) {
                var a = _a[0], w = _a[1];
                return [[a, w], w];
            }));
        }; },
        pass: function (fa) { return function () {
            return pipe(fa(), M.map(function (_a) {
                var _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
                return [a, f(w)];
            }));
        }; },
        listens: function (fa, f) { return function () {
            return pipe(fa(), M.map(function (_a) {
                var a = _a[0], w = _a[1];
                return [[a, f(w)], w];
            }));
        }; },
        censor: function (fa, f) { return function () {
            return pipe(fa(), M.map(function (_a) {
                var a = _a[0], w = _a[1];
                return [a, f(w)];
            }));
        }; },
        getMonad: function (W) {
            return {
                _E: undefined,
                map: map,
                of: function (a) { return function () { return M.of([a, W.empty]); }; },
                ap: function (fa) { return function (fab) { return function () {
                    return pipe(fab(), M.chain(function (_a) {
                        var f = _a[0], w1 = _a[1];
                        return pipe(fa(), M.map(function (_a) {
                            var a = _a[0], w2 = _a[1];
                            return [f(a), W.concat(w1, w2)];
                        }));
                    }));
                }; }; },
                chain: function (f) { return function (ma) { return function () {
                    return pipe(ma(), M.chain(function (_a) {
                        var a = _a[0], w1 = _a[1];
                        return pipe(f(a)(), M.map(function (_a) {
                            var b = _a[0], w2 = _a[1];
                            return [b, W.concat(w1, w2)];
                        }));
                    }));
                }; }; }
            };
        }
    };
}

import { pipe } from './function';
export function map(F) {
    return function (f) { return function (fa) { return function (s) {
        return pipe(fa(s), F.map(function (_a) {
            var a = _a[0], s1 = _a[1];
            return [f(a), s1];
        }));
    }; }; };
}
export function ap(M) {
    return function (fa) { return function (fab) { return function (s) {
        return pipe(fab(s), M.chain(function (_a) {
            var f = _a[0], s = _a[1];
            return pipe(fa(s), M.map(function (_a) {
                var a = _a[0], s = _a[1];
                return [f(a), s];
            }));
        }));
    }; }; };
}
export function of(A) {
    return function (a) { return function (s) { return A.of([a, s]); }; };
}
export function chain(M) {
    return function (f) { return function (ma) { return function (s) {
        return pipe(ma(s), M.chain(function (_a) {
            var a = _a[0], s1 = _a[1];
            return f(a)(s1);
        }));
    }; }; };
}
export function get(A) {
    return function () { return function (s) { return A.of([s, s]); }; };
}
export function put(A) {
    return function (s) { return function () { return A.of([undefined, s]); }; };
}
export function modify(A) {
    return function (f) { return function (s) { return A.of([undefined, f(s)]); }; };
}
export function gets(A) {
    return function (f) { return function (s) { return A.of([f(s), s]); }; };
}
export function fromState(A) {
    return function (sa) { return function (s) { return A.of(sa(s)); }; };
}
export function fromF(F) {
    return function (fa) { return function (s) {
        return pipe(fa, F.map(function (a) { return [a, s]; }));
    }; };
}
export function evaluate(F) {
    return function (s) { return function (fsa) {
        return pipe(fsa(s), F.map(function (_a) {
            var a = _a[0];
            return a;
        }));
    }; };
}
export function execute(F) {
    return function (s) { return function (fsa) {
        return pipe(fsa(s), F.map(function (_a) {
            var _ = _a[0], s = _a[1];
            return s;
        }));
    }; };
}

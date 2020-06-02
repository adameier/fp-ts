"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.evaluate = exports.fromF = exports.fromState = exports.gets = exports.modify = exports.put = exports.get = exports.chain = exports.of = exports.ap = exports.map = void 0;
var function_1 = require("./function");
function map(F) {
    return function (f) { return function (fa) { return function (s) {
        return function_1.pipe(fa(s), F.map(function (_a) {
            var a = _a[0], s1 = _a[1];
            return [f(a), s1];
        }));
    }; }; };
}
exports.map = map;
function ap(M) {
    return function (fa) { return function (fab) { return function (s) {
        return function_1.pipe(fab(s), M.chain(function (_a) {
            var f = _a[0], s = _a[1];
            return function_1.pipe(fa(s), M.map(function (_a) {
                var a = _a[0], s = _a[1];
                return [f(a), s];
            }));
        }));
    }; }; };
}
exports.ap = ap;
function of(A) {
    return function (a) { return function (s) { return A.of([a, s]); }; };
}
exports.of = of;
function chain(M) {
    return function (f) { return function (ma) { return function (s) {
        return function_1.pipe(ma(s), M.chain(function (_a) {
            var a = _a[0], s1 = _a[1];
            return f(a)(s1);
        }));
    }; }; };
}
exports.chain = chain;
function get(A) {
    return function () { return function (s) { return A.of([s, s]); }; };
}
exports.get = get;
function put(A) {
    return function (s) { return function () { return A.of([undefined, s]); }; };
}
exports.put = put;
function modify(A) {
    return function (f) { return function (s) { return A.of([undefined, f(s)]); }; };
}
exports.modify = modify;
function gets(A) {
    return function (f) { return function (s) { return A.of([f(s), s]); }; };
}
exports.gets = gets;
function fromState(A) {
    return function (sa) { return function (s) { return A.of(sa(s)); }; };
}
exports.fromState = fromState;
function fromF(F) {
    return function (fa) { return function (s) {
        return function_1.pipe(fa, F.map(function (a) { return [a, s]; }));
    }; };
}
exports.fromF = fromF;
function evaluate(F) {
    return function (s) { return function (fsa) {
        return function_1.pipe(fsa(s), F.map(function (_a) {
            var a = _a[0];
            return a;
        }));
    }; };
}
exports.evaluate = evaluate;
function execute(F) {
    return function (s) { return function (fsa) {
        return function_1.pipe(fsa(s), F.map(function (_a) {
            var _ = _a[0], s = _a[1];
            return s;
        }));
    }; };
}
exports.execute = execute;

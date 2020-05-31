"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateM = void 0;
var function_1 = require("./function");
function getStateM(M) {
    return {
        map: function (f) { return function (fa) { return function (s) {
            return function_1.pipe(fa(s), M.map(function (_a) {
                var a = _a[0], s1 = _a[1];
                return [f(a), s1];
            }));
        }; }; },
        of: function (a) { return function (s) { return M.of([a, s]); }; },
        ap: function (fa) { return function (fab) { return function (s) {
            return function_1.pipe(fab(s), M.chain(function (_a) {
                var f = _a[0], s = _a[1];
                return function_1.pipe(fa(s), M.map(function (_a) {
                    var a = _a[0], s = _a[1];
                    return [f(a), s];
                }));
            }));
        }; }; },
        chain: function (f) { return function (ma) { return function (s) {
            return function_1.pipe(ma(s), M.chain(function (_a) {
                var a = _a[0], s1 = _a[1];
                return f(a)(s1);
            }));
        }; }; },
        get: function () { return function (s) { return M.of([s, s]); }; },
        put: function (s) { return function () { return M.of([undefined, s]); }; },
        modify: function (f) { return function (s) { return M.of([undefined, f(s)]); }; },
        gets: function (f) { return function (s) { return M.of([f(s), s]); }; },
        fromState: function (sa) { return function (s) { return M.of(sa(s)); }; },
        fromM: function (ma) { return function (s) {
            return function_1.pipe(ma, M.map(function (a) { return [a, s]; }));
        }; },
        evalState: function (ma, s) {
            return function_1.pipe(ma(s), M.map(function (_a) {
                var a = _a[0];
                return a;
            }));
        },
        execState: function (ma, s) {
            return function_1.pipe(ma(s), M.map(function (_a) {
                var _ = _a[0], s = _a[1];
                return s;
            }));
        }
    };
}
exports.getStateM = getStateM;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intercalate = exports.reduceM = void 0;
/**
 * @since 2.0.0
 */
var function_1 = require("./function");
function reduceM(M, F) {
    return function (fa, b, f) {
        return function_1.pipe(fa, F.reduce(M.of(b), function (mb, a) {
            return function_1.pipe(mb, M.chain(function (b) { return f(b, a); }));
        }));
    };
}
exports.reduceM = reduceM;
function intercalate(M, F) {
    return function (sep, fm) {
        var go = function (_a, x) {
            var init = _a.init, acc = _a.acc;
            return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) };
        };
        return function_1.pipe(fm, F.reduce({ init: true, acc: M.empty }, go)).acc;
    };
}
exports.intercalate = intercalate;

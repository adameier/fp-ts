"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intercalate = exports.reduceM = exports.getFoldableComposition = void 0;
/**
 * @since 2.0.0
 */
var function_1 = require("./function");
function getFoldableComposition(F, G) {
    return {
        reduce: function (b, f) { return F.reduce(b, function (b, ga) { return function_1.pipe(ga, G.reduce(b, f)); }); },
        foldMap: function (M) {
            var foldMapF = F.foldMap(M);
            var foldMapG = G.foldMap(M);
            return function (f) { return foldMapF(foldMapG(f)); };
        },
        reduceRight: function (b, f) { return F.reduceRight(b, function (ga, b) { return function_1.pipe(ga, G.reduceRight(b, f)); }); }
    };
}
exports.getFoldableComposition = getFoldableComposition;
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

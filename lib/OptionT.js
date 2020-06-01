"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrElse = exports.fold = exports.alt = exports.chain = exports.some = exports.ap = exports.map = void 0;
var function_1 = require("./function");
var O = require("./Option");
function map(F) {
    return function (f) { return F.map(O.map(f)); };
}
exports.map = map;
function ap(F) {
    return function (fa) { return function (fab) {
        return function_1.pipe(fab, F.map(function (h) { return function (ga) { return function_1.pipe(h, O.ap(ga)); }; }), F.ap(fa));
    }; };
}
exports.ap = ap;
function some(A) {
    return function (a) { return A.of(O.some(a)); };
}
exports.some = some;
function chain(M) {
    return function (f) { return M.chain(O.fold(function () { return M.of(O.none); }, f)); };
}
exports.chain = chain;
function alt(M) {
    return function (that) { return M.chain(O.fold(that, function (a) { return M.of(O.some(a)); })); };
}
exports.alt = alt;
function fold(M) {
    return function (onNone, onSome) { return M.chain(O.fold(onNone, onSome)); };
}
exports.fold = fold;
function getOrElse(M) {
    return function (onNone) { return M.chain(O.fold(onNone, M.of)); };
}
exports.getOrElse = getOrElse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orElse = exports.getOrElse = exports.fold = exports.mapLeft = exports.bimap = exports.alt = exports.chain = exports.left = exports.right = exports.ap = void 0;
var E = require("./Either");
var function_1 = require("./function");
function ap(F) {
    return function (fa) { return function (fab) {
        return function_1.pipe(fab, F.map(function (h) { return function (ga) { return function_1.pipe(h, E.ap(ga)); }; }), F.ap(fa));
    }; };
}
exports.ap = ap;
function right(A) {
    return function (a) { return A.of(E.right(a)); };
}
exports.right = right;
function left(A) {
    return function (a) { return A.of(E.left(a)); };
}
exports.left = left;
function chain(M) {
    return function (f) { return M.chain(function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); };
}
exports.chain = chain;
function alt(M) {
    var ofM = right(M);
    return function (that) { return M.chain(function (e) { return (E.isLeft(e) ? that() : ofM(e.right)); }); };
}
exports.alt = alt;
function bimap(F) {
    return function (f, g) { return F.map(E.bifunctorEither.bimap(f, g)); };
}
exports.bimap = bimap;
function mapLeft(F) {
    return function (f) { return F.map(E.bifunctorEither.mapLeft(f)); };
}
exports.mapLeft = mapLeft;
function fold(M) {
    return function (onLeft, onRight) { return M.chain(E.fold(onLeft, onRight)); };
}
exports.fold = fold;
function getOrElse(M) {
    return function (onLeft) { return M.chain(E.fold(onLeft, M.of)); };
}
exports.getOrElse = getOrElse;
function orElse(M) {
    var ofM = right(M);
    return function (f) { return M.chain(E.fold(f, function (a) { return ofM(a); })); };
}
exports.orElse = orElse;

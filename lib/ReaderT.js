"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromReader = exports.asks = exports.chain = exports.ap = exports.of = exports.map = void 0;
var function_1 = require("./function");
function map(F) {
    return function (f) { return function (fa) { return function (r) { return function_1.pipe(fa(r), F.map(f)); }; }; };
}
exports.map = map;
function of(F) {
    return function (a) { return function () { return F.of(a); }; };
}
exports.of = of;
function ap(F) {
    return function (fa) { return function (rab) { return function (r) { return function_1.pipe(rab(r), F.ap(fa(r))); }; }; };
}
exports.ap = ap;
function chain(M) {
    return function (f) { return function (fa) { return function (r) {
        return function_1.pipe(fa(r), M.chain(function (a) { return f(a)(r); }));
    }; }; };
}
exports.chain = chain;
function asks(F) {
    return function (f) { return function (r) { return function_1.pipe(F.of(r), F.map(f)); }; };
}
exports.asks = asks;
function fromReader(F) {
    return function (ma) { return function (r) { return F.of(ma(r)); }; };
}
exports.fromReader = fromReader;

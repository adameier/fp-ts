"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReaderM = void 0;
var function_1 = require("./function");
function getReaderM(M) {
    return {
        map: function (f) { return function (ma) { return function (r) { return function_1.pipe(ma(r), M.map(f)); }; }; },
        of: function (a) { return function () { return M.of(a); }; },
        ap: function (ma) { return function (mab) { return function (r) { return function_1.pipe(mab(r), M.ap(ma(r))); }; }; },
        chain: function (f) { return function (ma) { return function (r) {
            return function_1.pipe(ma(r), M.chain(function (a) { return f(a)(r); }));
        }; }; },
        ask: function () { return M.of; },
        asks: function (f) { return function (r) { return function_1.pipe(M.of(r), M.map(f)); }; },
        local: function (f) { return function (ma) { return function (q) { return ma(f(q)); }; }; },
        fromReader: function (ma) { return function (r) { return M.of(ma(r)); }; },
        fromM: function (ma) { return function () { return ma; }; }
    };
}
exports.getReaderM = getReaderM;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
/**
 * @since 2.4.0
 */
var function_1 = require("./function");
var TH = require("./These");
function chain(M) {
    return function (S) { return function (f) {
        return M.chain(TH.fold(function (e) { return M.of(TH.left(e)); }, f, function (e1, a) {
            return function_1.pipe(f(a), M.map(TH.fold(function (e2) { return TH.left(S.concat(e1, e2)); }, TH.right, function (e2, b) { return TH.both(S.concat(e1, e2), b); })));
        }));
    }; };
}
exports.chain = chain;

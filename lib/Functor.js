"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctorComposition = void 0;
var function_1 = require("./function");
function getFunctorComposition(F, G) {
    return {
        map: function (f) { return function (fa) {
            return function_1.pipe(fa, F.map(function (ga) { return function_1.pipe(ga, G.map(f)); }));
        }; }
    };
}
exports.getFunctorComposition = getFunctorComposition;

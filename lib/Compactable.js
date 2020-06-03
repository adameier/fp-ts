"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateComposition = void 0;
var function_1 = require("./function");
var Option_1 = require("./Option");
function separateComposition(F, G) {
    var map = function_1.flow(G.map, F.map);
    var compact = F.map(G.compact);
    return function (fge) { return ({
        left: function_1.pipe(fge, map(Option_1.getLeft), compact),
        right: function_1.pipe(fge, map(Option_1.getRight), compact)
    }); };
}
exports.separateComposition = separateComposition;

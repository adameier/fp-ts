"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceComposition = exports.traverseComposition = void 0;
var function_1 = require("./function");
/**
 * @since 3.0.0
 */
function traverseComposition(F, G) {
    return function (H) {
        var traverseF = F.traverse(H);
        var traverseG = G.traverse(H);
        return function (f) { return traverseF(function (ga) { return function_1.pipe(ga, traverseG(f)); }); };
    };
}
exports.traverseComposition = traverseComposition;
/**
 * @since 3.0.0
 */
function sequenceComposition(F, G) {
    return function (H) {
        var sequenceF = F.sequence(H);
        var sequenceG = G.sequence(H);
        return function (fgha) { return sequenceF(function_1.pipe(fgha, F.map(sequenceG))); };
    };
}
exports.sequenceComposition = sequenceComposition;

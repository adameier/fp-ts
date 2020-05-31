"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraversableComposition = void 0;
var Foldable_1 = require("./Foldable");
var Functor_1 = require("./Functor");
var function_1 = require("./function");
function getTraversableComposition(F, G) {
    var FuC = Functor_1.getFunctorComposition(F, G);
    var FoC = Foldable_1.getFoldableComposition(F, G);
    return {
        map: FuC.map,
        reduce: FoC.reduce,
        foldMap: FoC.foldMap,
        reduceRight: FoC.reduceRight,
        traverse: function (H) {
            var traverseF = F.traverse(H);
            var traverseG = G.traverse(H);
            return function (f) { return traverseF(function (ga) { return function_1.pipe(ga, traverseG(f)); }); };
        },
        sequence: function (H) {
            var sequenceF = F.sequence(H);
            var sequenceG = G.sequence(H);
            return function (fgha) { return sequenceF(function_1.pipe(fgha, F.map(sequenceG))); };
        }
    };
}
exports.getTraversableComposition = getTraversableComposition;

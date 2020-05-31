import { getFoldableComposition } from './Foldable';
import { getFunctorComposition } from './Functor';
import { pipe } from './function';
export function getTraversableComposition(F, G) {
    var FuC = getFunctorComposition(F, G);
    var FoC = getFoldableComposition(F, G);
    return {
        map: FuC.map,
        reduce: FoC.reduce,
        foldMap: FoC.foldMap,
        reduceRight: FoC.reduceRight,
        traverse: function (H) {
            var traverseF = F.traverse(H);
            var traverseG = G.traverse(H);
            return function (f) { return traverseF(function (ga) { return pipe(ga, traverseG(f)); }); };
        },
        sequence: function (H) {
            var sequenceF = F.sequence(H);
            var sequenceG = G.sequence(H);
            return function (fgha) { return sequenceF(pipe(fgha, F.map(sequenceG))); };
        }
    };
}

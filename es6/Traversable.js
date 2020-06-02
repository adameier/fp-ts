import { pipe } from './function';
/**
 * @since 3.0.0
 */
export function traverseComposition(F, G) {
    return function (H) {
        var traverseF = F.traverse(H);
        var traverseG = G.traverse(H);
        return function (f) { return traverseF(function (ga) { return pipe(ga, traverseG(f)); }); };
    };
}
/**
 * @since 3.0.0
 */
export function sequenceComposition(F, G) {
    return function (H) {
        var sequenceF = F.sequence(H);
        var sequenceG = G.sequence(H);
        return function (fgha) { return sequenceF(pipe(fgha, F.map(sequenceG))); };
    };
}

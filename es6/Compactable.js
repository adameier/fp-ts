import { flow, pipe } from './function';
import { getLeft, getRight } from './Option';
export function separateComposition(F, G) {
    var map = flow(G.map, F.map);
    var compact = F.map(G.compact);
    return function (fge) { return ({
        left: compact(pipe(fge, map(getLeft))),
        right: compact(pipe(fge, map(getRight)))
    }); };
}

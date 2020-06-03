import { pipe, flow } from './function';
import { getLeft, getRight } from './Option';
export function filterComposition(F, G) {
    return function (predicate) { return F.map(G.filter(predicate)); };
}
export function filterMapComposition(F, G) {
    return flow(G.filterMap, F.map);
}
export function partitionComposition(F, G) {
    var filter = filterComposition(F, G);
    return function (predicate) { return function (fga) { return ({
        left: pipe(fga, filter(function (a) { return !predicate(a); })),
        right: pipe(fga, filter(predicate))
    }); }; };
}
export function partitionMapComposition(F, G) {
    var filterMap = filterMapComposition(F, G);
    return function (f) { return function (fga) {
        return {
            left: pipe(fga, filterMap(function (a) { return getLeft(f(a)); })),
            right: pipe(fga, filterMap(function (a) { return getRight(f(a)); }))
        };
    }; };
}

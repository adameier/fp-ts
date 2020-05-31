/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
import { getCompactableComposition } from './Compactable';
import { pipe } from './function';
import { getLeft, getRight } from './Option';
export function getFilterableComposition(F, G) {
    var CC = getCompactableComposition(F, G);
    var FC = {
        map: CC.map,
        compact: CC.compact,
        separate: CC.separate,
        partitionMap: function (f) { return function (fga) {
            return {
                left: pipe(fga, FC.filterMap(function (a) { return getLeft(f(a)); })),
                right: pipe(fga, FC.filterMap(function (a) { return getRight(f(a)); }))
            };
        }; },
        partition: function (p) { return function (fga) {
            return {
                left: pipe(fga, FC.filter(function (a) { return !p(a); })),
                right: pipe(fga, FC.filter(p))
            };
        }; },
        filterMap: function (f) { return function (fga) { return pipe(fga, F.map(G.filterMap(f))); }; },
        filter: function (f) { return function (fga) { return pipe(fga, F.map(G.filter(f))); }; }
    };
    return FC;
}

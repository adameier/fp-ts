import { getFunctorComposition } from './Functor';
import { pipe } from './function';
export function getApplicativeComposition(F, G) {
    var FG = getFunctorComposition(F, G);
    return {
        map: FG.map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fga) { return function (fgab) {
            return pipe(fgab, F.map(function (h) { return function (ga) { return pipe(h, G.ap(ga)); }; }), F.ap(fga));
        }; }
    };
}

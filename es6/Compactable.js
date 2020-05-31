import { getFunctorComposition } from './Functor';
import { getLeft, getRight } from './Option';
import { pipe } from './function';
export function getCompactableComposition(F, G) {
    var FC = getFunctorComposition(F, G);
    var CC = {
        map: FC.map,
        compact: function (fga) { return pipe(fga, F.map(G.compact)); },
        separate: function (fge) {
            var left = CC.compact(pipe(fge, FC.map(getLeft)));
            var right = CC.compact(pipe(fge, FC.map(getRight)));
            return { left: left, right: right };
        }
    };
    return CC;
}

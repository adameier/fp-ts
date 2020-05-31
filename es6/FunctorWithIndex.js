import { getFunctorComposition } from './Functor';
import { pipe } from './function';
export function getFunctorWithIndexComposition(F, G) {
    var FC = getFunctorComposition(F, G);
    return {
        map: FC.map,
        mapWithIndex: function (f) {
            return F.mapWithIndex(function (fi, ga) {
                return pipe(ga, G.mapWithIndex(function (gi, a) { return f([fi, gi], a); }));
            });
        }
    };
}

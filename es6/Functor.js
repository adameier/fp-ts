import { pipe } from './function';
export function getFunctorComposition(F, G) {
    return {
        map: function (f) { return function (fa) {
            return pipe(fa, F.map(function (ga) { return pipe(ga, G.map(f)); }));
        }; }
    };
}

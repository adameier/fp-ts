import * as TH from './These';
import { pipe } from './function';
export function getTheseM(M) {
    var map = function (f) { return function (fa) { return pipe(fa, M.map(TH.map(f))); }; };
    var of = function (a) { return M.of(TH.right(a)); };
    var left = function (e) { return M.of(TH.left(e)); };
    return {
        map: map,
        bimap: function (f, g) { return M.map(TH.bimap(f, g)); },
        mapLeft: function (f) { return M.map(TH.mapLeft(f)); },
        fold: function (onLeft, onRight, onBoth) { return M.chain(TH.fold(onLeft, onRight, onBoth)); },
        swap: M.map(TH.swap),
        rightM: M.map(TH.right),
        leftM: M.map(TH.left),
        left: left,
        right: of,
        both: function (e, a) { return M.of(TH.both(e, a)); },
        toTuple: function (e, a) { return M.map(TH.toTuple(e, a)); },
        getMonad: function (E) {
            var chain = function (f) {
                return M.chain(TH.fold(left, f, function (e1, a) {
                    return pipe(f(a), M.map(TH.fold(function (e2) { return TH.left(E.concat(e1, e2)); }, TH.right, function (e2, b) { return TH.both(E.concat(e1, e2), b); })));
                }));
            };
            return {
                _E: undefined,
                map: map,
                of: of,
                ap: function (fa) { return function (fab) {
                    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
                }; },
                chain: chain
            };
        }
    };
}

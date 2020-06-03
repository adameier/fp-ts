/**
 * @since 2.0.0
 */
import { pipe } from './function';
export function reduceM(M, F) {
    return function (fa, b, f) {
        return pipe(fa, F.reduce(M.of(b), function (mb, a) {
            return pipe(mb, M.chain(function (b) { return f(b, a); }));
        }));
    };
}
export function intercalate(M, F) {
    return function (sep, fm) {
        var go = function (_a, x) {
            var init = _a.init, acc = _a.acc;
            return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) };
        };
        return pipe(fm, F.reduce({ init: true, acc: M.empty }, go)).acc;
    };
}

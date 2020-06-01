import { pipe } from './function';
import * as O from './Option';
export function map(F) {
    return function (f) { return F.map(O.map(f)); };
}
export function ap(F) {
    return function (fa) { return function (fab) {
        return pipe(fab, F.map(function (h) { return function (ga) { return pipe(h, O.ap(ga)); }; }), F.ap(fa));
    }; };
}
export function some(A) {
    return function (a) { return A.of(O.some(a)); };
}
export function chain(M) {
    return function (f) { return M.chain(O.fold(function () { return M.of(O.none); }, f)); };
}
export function alt(M) {
    return function (that) { return M.chain(O.fold(that, function (a) { return M.of(O.some(a)); })); };
}
export function fold(M) {
    return function (onNone, onSome) { return M.chain(O.fold(onNone, onSome)); };
}
export function getOrElse(M) {
    return function (onNone) { return M.chain(O.fold(onNone, M.of)); };
}

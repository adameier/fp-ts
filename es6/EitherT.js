import * as E from './Either';
import { pipe } from './function';
export function map(F) {
    return function (f) { return F.map(E.map(f)); };
}
export function ap(F) {
    return function (fa) { return function (fab) {
        return pipe(fab, F.map(function (h) { return function (ga) { return pipe(h, E.ap(ga)); }; }), F.ap(fa));
    }; };
}
export function right(A) {
    return function (a) { return A.of(E.right(a)); };
}
export function left(A) {
    return function (a) { return A.of(E.left(a)); };
}
export function chain(M) {
    return function (f) { return M.chain(function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); };
}
export function alt(M) {
    var ofM = right(M);
    return function (that) { return M.chain(function (e) { return (E.isLeft(e) ? that() : ofM(e.right)); }); };
}
export function bimap(F) {
    return function (f, g) { return F.map(E.bifunctorEither.bimap(f, g)); };
}
export function mapLeft(F) {
    return function (f) { return F.map(E.bifunctorEither.mapLeft(f)); };
}
export function fold(M) {
    return function (onLeft, onRight) { return M.chain(E.fold(onLeft, onRight)); };
}
export function getOrElse(M) {
    return function (onLeft) { return M.chain(E.fold(onLeft, M.of)); };
}
export function orElse(M) {
    var ofM = right(M);
    return function (f) { return M.chain(E.fold(f, function (a) { return ofM(a); })); };
}

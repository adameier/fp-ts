import { pipe } from './function';
export function map(F) {
    return function (f) { return function (fa) { return function (r) { return pipe(fa(r), F.map(f)); }; }; };
}
export function of(F) {
    return function (a) { return function () { return F.of(a); }; };
}
export function ap(F) {
    return function (fa) { return function (rab) { return function (r) { return pipe(rab(r), F.ap(fa(r))); }; }; };
}
export function chain(M) {
    return function (f) { return function (fa) { return function (r) {
        return pipe(fa(r), M.chain(function (a) { return f(a)(r); }));
    }; }; };
}
export function asks(F) {
    return function (f) { return function (r) { return pipe(F.of(r), F.map(f)); }; };
}
export function fromReader(F) {
    return function (ma) { return function (r) { return F.of(ma(r)); }; };
}

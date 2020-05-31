import { pipe } from './function';
export function getReaderM(M) {
    return {
        map: function (f) { return function (ma) { return function (r) { return pipe(ma(r), M.map(f)); }; }; },
        of: function (a) { return function () { return M.of(a); }; },
        ap: function (ma) { return function (mab) { return function (r) { return pipe(mab(r), M.ap(ma(r))); }; }; },
        chain: function (f) { return function (ma) { return function (r) {
            return pipe(ma(r), M.chain(function (a) { return f(a)(r); }));
        }; }; },
        ask: function () { return M.of; },
        asks: function (f) { return function (r) { return pipe(M.of(r), M.map(f)); }; },
        local: function (f) { return function (ma) { return function (q) { return ma(f(q)); }; }; },
        fromReader: function (ma) { return function (r) { return M.of(ma(r)); }; },
        fromM: function (ma) { return function () { return ma; }; }
    };
}

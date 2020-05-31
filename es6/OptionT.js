/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { applicativeOption, fold, none, some } from './Option';
export function getOptionM(M) {
    var A = getApplicativeComposition(M, applicativeOption);
    var fnone = M.of(none);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (f) { return M.chain(fold(function () { return fnone; }, f)); },
        alt: function (that) { return M.chain(fold(that, function (a) { return M.of(some(a)); })); },
        fold: function (onNone, onSome) { return M.chain(fold(onNone, onSome)); },
        getOrElse: function (onNone) { return M.chain(fold(onNone, M.of)); },
        fromM: M.map(some),
        none: function () { return fnone; }
    };
}

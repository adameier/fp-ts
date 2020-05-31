/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { applicativeEither, bifunctorEither, fold, isLeft, left, right, swap } from './Either';
export function getEitherM(M) {
    var A = getApplicativeComposition(M, applicativeEither);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (f) { return M.chain(function (e) { return (isLeft(e) ? M.of(left(e.left)) : f(e.right)); }); },
        alt: function (that) { return M.chain(function (e) { return (isLeft(e) ? that() : A.of(e.right)); }); },
        bimap: function (f, g) { return M.map(bifunctorEither.bimap(f, g)); },
        mapLeft: function (f) { return M.map(bifunctorEither.mapLeft(f)); },
        fold: function (onLeft, onRight) { return M.chain(fold(onLeft, onRight)); },
        getOrElse: function (onLeft) { return M.chain(fold(onLeft, M.of)); },
        orElse: function (f) { return M.chain(fold(f, function (a) { return A.of(a); })); },
        swap: M.map(swap),
        rightM: M.map(right),
        leftM: M.map(left),
        left: function (e) { return M.of(left(e)); }
    };
}

/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { getValidation, isLeft, isRight, left } from './Either';
import { pipe } from './function';
export function getValidationM(S, M) {
    var A = getApplicativeComposition(M, getValidation(S));
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        alt: function (that) {
            return M.chain(function (e1) {
                return isRight(e1)
                    ? A.of(e1.right)
                    : pipe(that(), M.map(function (e2) { return (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2); }));
            });
        }
    };
}

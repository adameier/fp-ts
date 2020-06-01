/**
 * @since 2.0.0
 */
import { isLeft, isRight, left, right } from './Either';
import { pipe } from './function';
export function alt(S, M) {
    return function (that) {
        return M.chain(function (e1) {
            return isRight(e1)
                ? M.of(right(e1.right))
                : pipe(that(), M.map(function (e2) { return (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2); }));
        });
    };
}

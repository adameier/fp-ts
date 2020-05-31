/**
 * A `Foldable` with an additional index.
 * A `FoldableWithIndex` instance must be compatible with its `Foldable` instance
 *
 * ```ts
 * reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
 * foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
 * reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
 * ```
 *
 * @since 2.0.0
 */
import { getFoldableComposition } from './Foldable';
import { pipe } from './function';
export function getFoldableWithIndexComposition(F, G) {
    var FC = getFoldableComposition(F, G);
    return {
        reduce: FC.reduce,
        foldMap: FC.foldMap,
        reduceRight: FC.reduceRight,
        reduceWithIndex: function (b, f) {
            return F.reduceWithIndex(b, function (fi, b, ga) {
                return pipe(ga, G.reduceWithIndex(b, function (gi, b, a) { return f([fi, gi], b, a); }));
            });
        },
        foldMapWithIndex: function (M) {
            var foldMapWithIndexF = F.foldMapWithIndex(M);
            var foldMapWithIndexG = G.foldMapWithIndex(M);
            return function (f) {
                return foldMapWithIndexF(function (fi, ga) {
                    return pipe(ga, foldMapWithIndexG(function (gi, a) { return f([fi, gi], a); }));
                });
            };
        },
        reduceRightWithIndex: function (b, f) {
            return F.reduceRightWithIndex(b, function (fi, ga, b) {
                return pipe(ga, G.reduceRightWithIndex(b, function (gi, a, b) { return f([fi, gi], a, b); }));
            });
        }
    };
}

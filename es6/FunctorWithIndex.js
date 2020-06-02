/**
 * A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.
 *
 * `mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.mapWithIndex(fa, (_i, a) => a) = fa`
 * 2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) = F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`
 *
 * @since 2.0.0
 */
import { pipe } from './function';
export function mapWithIndexComposition(F, G) {
    return function (f) {
        return F.mapWithIndex(function (fi, ga) {
            return pipe(ga, G.mapWithIndex(function (gi, a) { return f([fi, gi], a); }));
        });
    };
}

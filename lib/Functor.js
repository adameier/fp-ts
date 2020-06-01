"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctorComposition = void 0;
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) = fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
var function_1 = require("./function");
function getFunctorComposition(F, G) {
    return {
        map: function_1.flow(G.map, F.map)
    };
}
exports.getFunctorComposition = getFunctorComposition;

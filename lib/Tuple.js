"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.traversableTuple = exports.foldableTuple = exports.comonadTuple = exports.semigroupoidTuple = exports.bifunctorTuple = exports.functorTuple = exports.URI = exports.sequence = exports.traverse = exports.reduceRight = exports.reduce = exports.map = exports.foldMap = exports.extract = exports.extend = exports.duplicate = exports.compose = exports.mapLeft = exports.bimap = exports.getChainRec = exports.getMonad = exports.getChain = exports.getApplicative = exports.getApply = exports.swap = exports.snd = exports.fst = void 0;
var RT = require("./ReadonlyTuple");
// tslint:disable:readonly-array
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
exports.fst = RT.fst;
/**
 * @category destructors
 * @since 2.0.0
 */
exports.snd = RT.snd;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.swap = RT.swap;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getApply = RT.getApply;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getApplicative = RT.getApplicative;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getChain = RT.getChain;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getMonad = RT.getMonad;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.getChainRec = RT.getChainRec;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.bimap = RT.bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.mapLeft = RT.mapLeft;
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
exports.compose = RT.compose;
/**
 * @category Extend
 * @since 2.0.0
 */
exports.duplicate = RT.duplicate;
/**
 * @category Extend
 * @since 2.0.0
 */
exports.extend = RT.extend;
/**
 * @category Extract
 * @since 2.6.2
 */
exports.extract = RT.extract;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = RT.foldMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
exports.map = RT.map;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = RT.reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = RT.reduceRight;
/**
 * @since 2.6.3
 */
exports.traverse = RT.traverse;
/**
 * @since 2.6.3
 */
exports.sequence = RT.sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var map_ = RT.functorTuple.map;
var bimap_ = RT.bifunctorTuple.bimap;
var mapLeft_ = RT.bifunctorTuple.mapLeft;
var compose_ = RT.semigroupoidTuple.compose;
var extend_ = RT.comonadTuple.extend;
var reduce_ = RT.foldableTuple.reduce;
var foldMap_ = RT.foldableTuple.foldMap;
var reduceRight_ = RT.foldableTuple.reduceRight;
var traverse_ = RT.traversableTuple.traverse;
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Tuple';
/**
 * @category instances
 * @since 2.7.0
 */
exports.functorTuple = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.bifunctorTuple = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.semigroupoidTuple = {
    URI: exports.URI,
    compose: compose_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.comonadTuple = {
    URI: exports.URI,
    map: map_,
    extend: extend_,
    extract: exports.extract
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.foldableTuple = {
    URI: exports.URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.traversableTuple = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: compose_,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    extract: exports.extract,
    extend: extend_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};

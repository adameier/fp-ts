"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traversableTuple = exports.foldableTuple = exports.comonadTuple = exports.extendTuple = exports.bifunctorTuple = exports.semigroupoidTuple = exports.sequence = exports.traverse = exports.reduceRight = exports.reduce = exports.mapLeft = exports.map = exports.foldMap = exports.extract = exports.extend = exports.duplicate = exports.pipe = exports.bimap = exports.getMonad = exports.getChain = exports.getApplicative = exports.getApply = exports.swap = exports.snd = exports.fst = exports.URI = void 0;
var RT = require("./ReadonlyTuple");
// tslint:disable:readonly-array
/**
 * @since 2.0.0
 */
exports.URI = 'Tuple';
/**
 * @since 2.0.0
 */
exports.fst = RT.fst;
/**
 * @since 2.0.0
 */
exports.snd = RT.snd;
/**
 * @since 2.0.0
 */
exports.swap = RT.swap;
/**
 * @since 2.0.0
 */
exports.getApply = RT.getApply;
/**
 * @since 2.0.0
 */
exports.getApplicative = RT.getApplicative;
/**
 * @since 2.0.0
 */
exports.getChain = RT.getChain;
/**
 * @since 2.0.0
 */
exports.getMonad = RT.getMonad;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.bimap = RT.bimap;
/**
 * @since 3.0.0
 */
exports.pipe = RT.pipe;
/**
 * @since 2.0.0
 */
exports.duplicate = RT.duplicate;
/**
 * @since 2.0.0
 */
exports.extend = RT.extend;
/**
 * @since 2.6.2
 */
exports.extract = RT.extract;
/**
 * @since 2.0.0
 */
exports.foldMap = RT.foldMap;
/**
 * @since 2.0.0
 */
exports.map = RT.map;
/**
 * @since 2.0.0
 */
exports.mapLeft = RT.mapLeft;
/**
 * @since 2.0.0
 */
exports.reduce = RT.reduce;
/**
 * @since 2.0.0
 */
exports.reduceRight = RT.reduceRight;
/**
 * @since 3.0.0
 */
exports.traverse = RT.traverse;
/**
 * @since 3.0.0
 */
exports.sequence = RT.sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.semigroupoidTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
exports.bifunctorTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
exports.extendTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
exports.comonadTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
exports.foldableTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
exports.traversableTuple = RT.semigroupoidReadonlyTuple;

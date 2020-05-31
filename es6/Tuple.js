import * as RT from './ReadonlyTuple';
// tslint:disable:readonly-array
/**
 * @since 2.0.0
 */
export var URI = 'Tuple';
/**
 * @since 2.0.0
 */
export var fst = RT.fst;
/**
 * @since 2.0.0
 */
export var snd = RT.snd;
/**
 * @since 2.0.0
 */
export var swap = RT.swap;
/**
 * @since 2.0.0
 */
export var getApply = RT.getApply;
/**
 * @since 2.0.0
 */
export var getApplicative = RT.getApplicative;
/**
 * @since 2.0.0
 */
export var getChain = RT.getChain;
/**
 * @since 2.0.0
 */
export var getMonad = RT.getMonad;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var bimap = RT.bimap;
/**
 * @since 3.0.0
 */
export var pipe = RT.pipe;
/**
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
RT.duplicate;
/**
 * @since 2.0.0
 */
export var extend = RT.extend;
/**
 * @since 2.6.2
 */
export var extract = RT.extract;
/**
 * @since 2.0.0
 */
export var foldMap = RT.foldMap;
/**
 * @since 2.0.0
 */
export var map = RT.map;
/**
 * @since 2.0.0
 */
export var mapLeft = RT.mapLeft;
/**
 * @since 2.0.0
 */
export var reduce = RT.reduce;
/**
 * @since 2.0.0
 */
export var reduceRight = RT.reduceRight;
/**
 * @since 3.0.0
 */
export var traverse = RT.traverse;
/**
 * @since 3.0.0
 */
export var sequence = RT.sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var semigroupoidTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
export var bifunctorTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
export var extendTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
export var comonadTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
export var foldableTuple = RT.semigroupoidReadonlyTuple;
/**
 * @since 3.0.0
 */
export var traversableTuple = RT.semigroupoidReadonlyTuple;

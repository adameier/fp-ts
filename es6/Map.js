import * as RM from './ReadonlyMap';
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export var URI = 'Map';
/**
 * @since 2.0.0
 */
export var getShow = RM.getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
export var size = RM.size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
export var isEmpty = RM.isEmpty;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
export var member = RM.member;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
export var elem = RM.elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
export var keys = RM.keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
export var values = RM.values;
/**
 * @since 2.0.0
 */
export var collect = RM.collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
export var toArray = RM.toReadonlyArray;
export function toUnfoldable(O, U) {
    return RM.toUnfoldable(O, U);
}
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export var insertAt = RM.insertAt;
/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export var deleteAt = RM.deleteAt;
/**
 * @since 2.0.0
 */
export var updateAt = RM.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RM.modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export var pop = RM.pop;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
export var lookupWithKey = RM.lookupWithKey;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
export var lookup = RM.lookup;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.0.0
 */
export var isSubmap = RM.isSubmap;
/**
 * @since 2.0.0
 */
export var empty = new Map();
/**
 * @since 2.0.0
 */
export var getEq = RM.getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.0.0
 */
export var getMonoid = RM.getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
export var singleton = RM.singleton;
export function fromFoldable(E, M, F) {
    return RM.fromFoldable(E, M, F);
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var compact = RM.compact;
/**
 * @since 2.0.0
 */
export var filter = RM.filter;
/**
 * @since 2.0.0
 */
export var filterMap = RM.filterMap;
/**
 * @since 2.0.0
 */
export var map = RM.map;
/**
 * @since 2.0.0
 */
export var partition = RM.partition;
/**
 * @since 2.0.0
 */
export var partitionMap = RM.partitionMap;
/**
 * @since 2.0.0
 */
export var separate = RM.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var getFilterableWithIndex = RM.getFilterableWithIndex;
/**
 * @since 2.0.0
 */
export var getWitherable = RM.getWitherable;
/**
 * @since 3.0.0
 */
export var functorMap = RM.functorReadonlyMap;
/**
 * @since 3.0.0
 */
export var compactableMap = RM.compactableReadonlyMap;
/**
 * @since 2.5.0
 */
export var filterableMap = RM.filterableReadonlyMap;

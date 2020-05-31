var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as RR from './ReadonlyRecord';
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export var URI = 'Record';
/**
 * @since 2.0.0
 */
export var getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export var size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export var isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
export var keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
export var collect = RR.collect;
/**
 * @since 2.0.0
 */
export var toArray = RR.toReadonlyArray;
export function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
export function insertAt(k, a) {
    return RR.insertAt(k, a);
}
/**
 * @since 2.0.0
 */
export var hasOwnProperty = RR.hasOwnProperty;
export function deleteAt(k) {
    return RR.deleteAt(k);
}
/**
 * @since 2.0.0
 */
export var updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RR.modifyAt;
export function pop(k) {
    return RR.pop(k);
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export var isSubrecord = RR.isSubrecord;
export function getEq(E) {
    return RR.getEq(E);
}
export function getMonoid(S) {
    return RR.getMonoid(S);
}
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export var lookup = RR.lookup;
/**
 * @since 2.0.0
 */
export var empty = {};
export function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
export function map(f) {
    return RR.map(f);
}
export function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
export function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
export function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export var singleton = RR.singleton;
export function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
export function traverse(F) {
    return RR.traverse(F);
}
export function sequence(F) {
    return RR.sequence(F);
}
export function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
export function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
export function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
export function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
export function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
export function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
/**
 * @since 2.0.0
 */
export var every = RR.every;
/**
 * @since 2.0.0
 */
export var some = RR.some;
/**
 * @since 2.0.0
 */
export var elem = RR.elem;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var filter = RR.filter;
/**
 * @since 2.0.0
 */
export var filterMap = RR.filterMap;
/**
 * @since 2.0.0
 */
export var foldMap = RR.foldMap;
/**
 * @since 2.0.0
 */
export var partition = RR.partition;
/**
 * @since 2.0.0
 */
export var partitionMap = RR.partitionMap;
/**
 * @since 2.0.0
 */
export var reduce = RR.reduce;
/**
 * @since 2.0.0
 */
export var reduceRight = RR.reduceRight;
/**
 * @since 2.0.0
 */
export var compact = RR.compact;
/**
 * @since 2.0.0
 */
export var separate = RR.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var record = 
/*#__PURE__*/
(function () {
    return __assign(__assign({}, RR.readonlyRecord), { URI: URI });
})();

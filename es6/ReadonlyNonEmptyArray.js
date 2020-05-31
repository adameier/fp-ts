import { none, some } from './Option';
import * as RA from './ReadonlyArray';
import { getJoinSemigroup, getMeetSemigroup } from './Semigroup';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyNonEmptyArray';
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export var cons = RA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export var snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
export function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? some(as) : none;
}
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
/**
 * @since 2.5.0
 */
export var getShow = RA.getShow;
/**
 * @since 2.5.0
 */
export function head(nea) {
    return nea[0];
}
/**
 * @since 2.5.0
 */
export function tail(nea) {
    return nea.slice(1);
}
/**
 * @since 2.5.0
 */
export var reverse = RA.reverse;
/**
 * @since 2.5.0
 */
export function min(ord) {
    var S = getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * @since 2.5.0
 */
export function max(ord) {
    var S = getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
export function getSemigroup() {
    return {
        concat: concat
    };
}
/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
export var getEq = RA.getEq;
export function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return RA.empty;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = [head];
            }
        }
        r.push(nea);
        return r;
    };
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
export function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
export function groupBy(f) {
    return function (as) {
        var r = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (r.hasOwnProperty(k)) {
                r[k].push(a);
            }
            else {
                r[k] = [a];
            }
        }
        return r;
    };
}
/**
 * @since 2.5.0
 */
export function last(nea) {
    return nea[nea.length - 1];
}
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export function init(nea) {
    return nea.slice(0, -1);
}
/**
 * @since 2.5.0
 */
export function sort(O) {
    return RA.sort(O);
}
/**
 * @since 2.5.0
 */
export function insertAt(i, a) {
    return RA.insertAt(i, a);
}
/**
 * @since 2.5.0
 */
export function updateAt(i, a) {
    return RA.updateAt(i, a);
}
/**
 * @since 2.5.0
 */
export function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
export function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
/**
 * @since 2.5.0
 */
export function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
/**
 * @since 2.5.0
 */
export var of = RA.of;
export function concat(fx, fy) {
    return fx.concat(fy);
}
/**
 * @since 2.5.0
 */
export function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
/**
 * @since 2.5.1
 */
export var zipWith = RA.zipWith;
/**
 * @since 2.5.1
 */
export var zip = RA.zip;
/**
 * @since 2.5.1
 */
export var unzip = RA.unzip;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
export var foldMapWithIndex = function (S) { return function (f) { return function (fa) { return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0])); }; }; };
/**
 * @since 2.5.0
 */
export var foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
/**
 * @since 2.6.2
 */
export var alt = RA.alt;
/**
 * @since 2.5.0
 */
export var ap = RA.ap;
/**
 * @since 2.5.0
 */
export var apFirst = RA.apFirst;
/**
 * @since 2.5.0
 */
export var apSecond = RA.apSecond;
/**
 * @since 2.5.0
 */
export var chain = RA.chain;
/**
 * @since 2.5.0
 */
export var chainFirst = RA.chainFirst;
/**
 * @since 2.5.0
 */
export var duplicate = RA.duplicate;
/**
 * @since 2.5.0
 */
export var extend = RA.extend;
/**
 * @since 2.5.0
 */
export var flatten = RA.flatten;
/**
 * @since 2.5.0
 */
export var map = RA.map;
/**
 * @since 2.5.0
 */
export var mapWithIndex = RA.mapWithIndex;
/**
 * @since 2.5.0
 */
export var reduce = RA.reduce;
/**
 * @since 2.5.0
 */
export var reduceWithIndex = RA.reduceWithIndex;
/**
 * @since 2.5.0
 */
export var reduceRight = RA.reduceRight;
/**
 * @since 2.5.0
 */
export var reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * @since 3.0.0
 */
export var traverse = RA.traverse;
/**
 * @since 3.0.0
 */
export var sequence = RA.sequence;
/**
 * @since 3.0.0
 */
export var traverseWithIndex = RA.traverseWithIndex;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorReadonlyNonEmptyArray = RA.functorReadonlyArray;
/**
 * @since 3.0.0
 */
export var functorWithIndexReadonlyNonEmptyArray = RA.functorWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
export var applyReadonlyNonEmptyArray = RA.applyReadonlyArray;
/**
 * @since 3.0.0
 */
export var applicativeReadonlyNonEmptyArray = RA.applicativeReadonlyArray;
/**
 * @since 3.0.0
 */
export var monadReadonlyNonEmptyArray = RA.monadReadonlyArray;
/**
 * @since 3.0.0
 */
export var foldableReadonlyNonEmptyArray = RA.foldableReadonlyArray;
/**
 * @since 3.0.0
 */
export var foldableWithIndexReadonlyNonEmptyArray = RA.foldableWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
export var altReadonlyNonEmptyArray = RA.altReadonlyArray;
/**
 * @since 3.0.0
 */
export var traversableReadonlyNonEmptyArray = RA.traversableReadonlyArray;
/**
 * @since 3.0.0
 */
export var traversableWithIndexReadonlyNonEmptyArray = RA.traversableWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
export var extendReadonlyNonEmptyArray = RA.extendReadonlyArray;
/**
 * @since 3.0.0
 */
export var extract = head;
/**
 * @since 3.0.0
 */
export var comonadReadonlyNonEmptyArray = {
    URI: URI,
    map: extendReadonlyNonEmptyArray.map,
    extend: extendReadonlyNonEmptyArray.extend,
    extract: extract
};

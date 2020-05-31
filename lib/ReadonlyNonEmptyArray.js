"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comonadReadonlyNonEmptyArray = exports.extract = exports.extendReadonlyNonEmptyArray = exports.traversableWithIndexReadonlyNonEmptyArray = exports.traversableReadonlyNonEmptyArray = exports.altReadonlyNonEmptyArray = exports.foldableWithIndexReadonlyNonEmptyArray = exports.foldableReadonlyNonEmptyArray = exports.monadReadonlyNonEmptyArray = exports.applicativeReadonlyNonEmptyArray = exports.applyReadonlyNonEmptyArray = exports.functorWithIndexReadonlyNonEmptyArray = exports.functorReadonlyNonEmptyArray = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.extend = exports.duplicate = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.foldMap = exports.foldMapWithIndex = exports.unzip = exports.zip = exports.zipWith = exports.fold = exports.concat = exports.of = exports.filterWithIndex = exports.filter = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.init = exports.last = exports.groupBy = exports.groupSort = exports.group = exports.getEq = exports.getSemigroup = exports.max = exports.min = exports.reverse = exports.tail = exports.head = exports.getShow = exports.fromArray = exports.fromReadonlyArray = exports.snoc = exports.cons = exports.URI = void 0;
var Option_1 = require("./Option");
var RA = require("./ReadonlyArray");
var Semigroup_1 = require("./Semigroup");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
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
exports.cons = RA.cons;
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
exports.snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? Option_1.some(as) : Option_1.none;
}
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
exports.fromArray = fromArray;
/**
 * @since 2.5.0
 */
exports.getShow = RA.getShow;
/**
 * @since 2.5.0
 */
function head(nea) {
    return nea[0];
}
exports.head = head;
/**
 * @since 2.5.0
 */
function tail(nea) {
    return nea.slice(1);
}
exports.tail = tail;
/**
 * @since 2.5.0
 */
exports.reverse = RA.reverse;
/**
 * @since 2.5.0
 */
function min(ord) {
    var S = Semigroup_1.getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.min = min;
/**
 * @since 2.5.0
 */
function max(ord) {
    var S = Semigroup_1.getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.max = max;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
function getSemigroup() {
    return {
        concat: concat
    };
}
exports.getSemigroup = getSemigroup;
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
exports.getEq = RA.getEq;
function group(E) {
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
exports.group = group;
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
function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
exports.groupSort = groupSort;
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
function groupBy(f) {
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
exports.groupBy = groupBy;
/**
 * @since 2.5.0
 */
function last(nea) {
    return nea[nea.length - 1];
}
exports.last = last;
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
function init(nea) {
    return nea.slice(0, -1);
}
exports.init = init;
/**
 * @since 2.5.0
 */
function sort(O) {
    return RA.sort(O);
}
exports.sort = sort;
/**
 * @since 2.5.0
 */
function insertAt(i, a) {
    return RA.insertAt(i, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.5.0
 */
function updateAt(i, a) {
    return RA.updateAt(i, a);
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
exports.modifyAt = modifyAt;
function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * @since 2.5.0
 */
function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
exports.filterWithIndex = filterWithIndex;
/**
 * @since 2.5.0
 */
exports.of = RA.of;
function concat(fx, fy) {
    return fx.concat(fy);
}
exports.concat = concat;
/**
 * @since 2.5.0
 */
function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
exports.fold = fold;
/**
 * @since 2.5.1
 */
exports.zipWith = RA.zipWith;
/**
 * @since 2.5.1
 */
exports.zip = RA.zip;
/**
 * @since 2.5.1
 */
exports.unzip = RA.unzip;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.foldMapWithIndex = function (S) { return function (f) { return function (fa) { return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0])); }; }; };
/**
 * @since 2.5.0
 */
exports.foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
/**
 * @since 2.6.2
 */
exports.alt = RA.alt;
/**
 * @since 2.5.0
 */
exports.ap = RA.ap;
/**
 * @since 2.5.0
 */
exports.apFirst = RA.apFirst;
/**
 * @since 2.5.0
 */
exports.apSecond = RA.apSecond;
/**
 * @since 2.5.0
 */
exports.chain = RA.chain;
/**
 * @since 2.5.0
 */
exports.chainFirst = RA.chainFirst;
/**
 * @since 2.5.0
 */
exports.duplicate = RA.duplicate;
/**
 * @since 2.5.0
 */
exports.extend = RA.extend;
/**
 * @since 2.5.0
 */
exports.flatten = RA.flatten;
/**
 * @since 2.5.0
 */
exports.map = RA.map;
/**
 * @since 2.5.0
 */
exports.mapWithIndex = RA.mapWithIndex;
/**
 * @since 2.5.0
 */
exports.reduce = RA.reduce;
/**
 * @since 2.5.0
 */
exports.reduceWithIndex = RA.reduceWithIndex;
/**
 * @since 2.5.0
 */
exports.reduceRight = RA.reduceRight;
/**
 * @since 2.5.0
 */
exports.reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * @since 3.0.0
 */
exports.traverse = RA.traverse;
/**
 * @since 3.0.0
 */
exports.sequence = RA.sequence;
/**
 * @since 3.0.0
 */
exports.traverseWithIndex = RA.traverseWithIndex;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorReadonlyNonEmptyArray = RA.functorReadonlyArray;
/**
 * @since 3.0.0
 */
exports.functorWithIndexReadonlyNonEmptyArray = RA.functorWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
exports.applyReadonlyNonEmptyArray = RA.applyReadonlyArray;
/**
 * @since 3.0.0
 */
exports.applicativeReadonlyNonEmptyArray = RA.applicativeReadonlyArray;
/**
 * @since 3.0.0
 */
exports.monadReadonlyNonEmptyArray = RA.monadReadonlyArray;
/**
 * @since 3.0.0
 */
exports.foldableReadonlyNonEmptyArray = RA.foldableReadonlyArray;
/**
 * @since 3.0.0
 */
exports.foldableWithIndexReadonlyNonEmptyArray = RA.foldableWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
exports.altReadonlyNonEmptyArray = RA.altReadonlyArray;
/**
 * @since 3.0.0
 */
exports.traversableReadonlyNonEmptyArray = RA.traversableReadonlyArray;
/**
 * @since 3.0.0
 */
exports.traversableWithIndexReadonlyNonEmptyArray = RA.traversableWithIndexReadonlyArray;
/**
 * @since 3.0.0
 */
exports.extendReadonlyNonEmptyArray = RA.extendReadonlyArray;
/**
 * @since 3.0.0
 */
exports.extract = head;
/**
 * @since 3.0.0
 */
exports.comonadReadonlyNonEmptyArray = {
    URI: exports.URI,
    map: exports.extendReadonlyNonEmptyArray.map,
    extend: exports.extendReadonlyNonEmptyArray.extend,
    extract: exports.extract
};

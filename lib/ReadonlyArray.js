"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.witherableReadonlyArray = exports.extendReadonlyArray = exports.traversableWithIndexReadonlyArray = exports.traversableReadonlyArray = exports.alternativeReadonlyArray = exports.altReadonlyArray = exports.foldableWithIndexReadonlyArray = exports.foldableReadonlyArray = exports.filterableWithIndexReadonlyArray = exports.filterableReadonlyArray = exports.compactableReadonlyArray = exports.unfoldableReadonlyArray = exports.unfold = exports.monadReadonlyArray = exports.applicativeReadonlyArray = exports.applyReadonlyArray = exports.functorWithIndexReadonlyArray = exports.functorReadonlyArray = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.wilt = exports.wither = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.of = exports.difference = exports.intersection = exports.union = exports.comprehension = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.unzip = exports.zip = exports.zipWith = exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.unsafeDeleteAt = exports.updateAt = exports.unsafeUpdateAt = exports.insertAt = exports.unsafeInsertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.snoc = exports.cons = exports.lookup = exports.isOutOfBound = exports.isNonEmpty = exports.isEmpty = exports.scanRight = exports.scanLeft = exports.foldRight = exports.foldLeft = exports.flatten = exports.replicate = exports.range = exports.makeBy = exports.empty = exports.getOrd = exports.getEq = exports.getMonoid = exports.getShow = exports.toArray = exports.fromArray = exports.URI = void 0;
var function_1 = require("./function");
var Option_1 = require("./Option");
var Ord_1 = require("./Ord");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyArray';
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function fromArray(as) {
    var l = as.length;
    if (l === 0) {
        return exports.empty;
    }
    var ras = Array(l);
    for (var i = 0; i < l; i++) {
        ras[i] = as[i];
    }
    return ras;
}
exports.fromArray = fromArray;
/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function toArray(ras) {
    var l = ras.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = ras[i];
    }
    return as;
}
exports.toArray = toArray;
/**
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
    };
}
exports.getShow = getShow;
var concat = function (x, y) {
    var lenx = x.length;
    if (lenx === 0) {
        return y;
    }
    var leny = y.length;
    if (leny === 0) {
        return x;
    }
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
function getMonoid() {
    return {
        concat: concat,
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/lib/Eq'
 * import { getEq } from 'fp-ts/lib/ReadonlyArray'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @since 2.5.0
 */
function getEq(E) {
    return {
        equals: function (xs, ys) { return xs === ys || (xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); })); }
    };
}
exports.getEq = getEq;
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/lib/ReadonlyArray'
 * import { ordString } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @since 2.5.0
 */
function getOrd(O) {
    return Ord_1.fromCompare(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return Ord_1.ordNumber.compare(aLen, bLen);
    });
}
exports.getOrd = getOrd;
/**
 * An empty array
 *
 * @since 2.5.0
 */
exports.empty = [];
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/lib/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @since 2.5.0
 */
function makeBy(n, f) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    for (var i = 0; i < n; i++) {
        r.push(f(i));
    }
    return r;
}
exports.makeBy = makeBy;
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @since 2.5.0
 */
function range(start, end) {
    return makeBy(end - start + 1, function (i) { return start + i; });
}
exports.range = range;
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @since 2.5.0
 */
function replicate(n, a) {
    return makeBy(n, function () { return a; });
}
exports.replicate = replicate;
/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @since 2.5.0
 */
function flatten(mma) {
    var rLen = 0;
    var len = mma.length;
    for (var i = 0; i < len; i++) {
        rLen += mma[i].length;
    }
    var r = Array(rLen);
    var start = 0;
    for (var i = 0; i < len; i++) {
        var arr = mma[i];
        var l = arr.length;
        for (var j = 0; j < l; j++) {
            r[j + start] = arr[j];
        }
        start += l;
    }
    return r;
}
exports.flatten = flatten;
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @since 2.5.0
 */
function foldLeft(onNil, onCons) {
    return function (as) { return (isEmpty(as) ? onNil() : onCons(as[0], as.slice(1))); };
}
exports.foldLeft = foldLeft;
/**
 * Break an array into its initial elements and the last element
 *
 * @since 2.5.0
 */
function foldRight(onNil, onCons) {
    return function (as) { return (isEmpty(as) ? onNil() : onCons(as.slice(0, as.length - 1), as[as.length - 1])); };
}
exports.foldRight = foldRight;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 * ```
 *
 * @since 2.5.0
 */
function scanLeft(b, f) {
    return function (as) {
        var l = as.length;
        // tslint:disable-next-line: readonly-array
        var r = new Array(l + 1);
        r[0] = b;
        for (var i = 0; i < l; i++) {
            r[i + 1] = f(r[i], as[i]);
        }
        return r;
    };
}
exports.scanLeft = scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 2.5.0
 */
function scanRight(b, f) {
    return function (as) {
        var l = as.length;
        // tslint:disable-next-line: readonly-array
        var r = new Array(l + 1);
        r[l] = b;
        for (var i = l - 1; i >= 0; i--) {
            r[i] = f(as[i], r[i + 1]);
        }
        return r;
    };
}
exports.scanRight = scanRight;
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.5.0
 */
function isEmpty(as) {
    return as.length === 0;
}
exports.isEmpty = isEmpty;
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @since 2.5.0
 */
function isNonEmpty(as) {
    return as.length > 0;
}
exports.isNonEmpty = isNonEmpty;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
function isOutOfBound(i, as) {
    return i < 0 || i >= as.length;
}
exports.isOutOfBound = isOutOfBound;
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
 *
 * @since 2.5.0
 */
function lookup(i, as) {
    return isOutOfBound(i, as) ? Option_1.none : Option_1.some(as[i]);
}
exports.lookup = lookup;
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
 *
 * @since 2.5.0
 */
function cons(head, tail) {
    var len = tail.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i + 1] = tail[i];
    }
    r[0] = head;
    return r;
}
exports.cons = cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
function snoc(init, end) {
    var len = init.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i] = init[i];
    }
    r[len] = end;
    return r;
}
exports.snoc = snoc;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
function head(as) {
    return isEmpty(as) ? Option_1.none : Option_1.some(as[0]);
}
exports.head = head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
function last(as) {
    return lookup(as.length - 1, as);
}
exports.last = last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
function tail(as) {
    return isEmpty(as) ? Option_1.none : Option_1.some(as.slice(1));
}
exports.tail = tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
function init(as) {
    var len = as.length;
    return len === 0 ? Option_1.none : Option_1.some(as.slice(0, len - 1));
}
exports.init = init;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @since 2.5.0
 */
function takeLeft(n) {
    return function (as) { return as.slice(0, n); };
}
exports.takeLeft = takeLeft;
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.5.0
 */
function takeRight(n) {
    return function (as) { return (n === 0 ? exports.empty : as.slice(-n)); };
}
exports.takeRight = takeRight;
function takeLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        return init;
    };
}
exports.takeLeftWhile = takeLeftWhile;
var spanIndexUncurry = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return { init: init, rest: rest };
    };
}
exports.spanLeft = spanLeft;
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @since 2.5.0
 */
function dropLeft(n) {
    return function (as) { return as.slice(n, as.length); };
}
exports.dropLeft = dropLeft;
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @since 2.5.0
 */
function dropRight(n) {
    return function (as) { return as.slice(0, as.length - n); };
}
exports.dropRight = dropRight;
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @since 2.5.0
 */
function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return rest;
    };
}
exports.dropLeftWhile = dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
function findIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return Option_1.some(i);
            }
        }
        return Option_1.none;
    };
}
exports.findIndex = findIndex;
function findFirst(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return Option_1.some(as[i]);
            }
        }
        return Option_1.none;
    };
}
exports.findFirst = findFirst;
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
function findFirstMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            var v = f(as[i]);
            if (Option_1.isSome(v)) {
                return v;
            }
        }
        return Option_1.none;
    };
}
exports.findFirstMap = findFirstMap;
function findLast(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return Option_1.some(as[i]);
            }
        }
        return Option_1.none;
    };
}
exports.findLast = findLast;
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
function findLastMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            var v = f(as[i]);
            if (Option_1.isSome(v)) {
                return v;
            }
        }
        return Option_1.none;
    };
}
exports.findLastMap = findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
function findLastIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return Option_1.some(i);
            }
        }
        return Option_1.none;
    };
}
exports.findLastIndex = findLastIndex;
/**
 * @since 2.5.0
 */
function unsafeInsertAt(i, a, as) {
    var xs = as.slice();
    xs.splice(i, 0, a);
    return xs;
}
exports.unsafeInsertAt = unsafeInsertAt;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
function insertAt(i, a) {
    return function (as) { return (i < 0 || i > as.length ? Option_1.none : Option_1.some(unsafeInsertAt(i, a, as))); };
}
exports.insertAt = insertAt;
/**
 * @since 2.5.0
 */
function unsafeUpdateAt(i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        // tslint:disable-next-line: readonly-array
        var xs = as.slice();
        xs[i] = a;
        return xs;
    }
}
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
function updateAt(i, a) {
    return function (as) { return (isOutOfBound(i, as) ? Option_1.none : Option_1.some(unsafeUpdateAt(i, a, as))); };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function unsafeDeleteAt(i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
}
exports.unsafeDeleteAt = unsafeDeleteAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
function deleteAt(i) {
    return function (as) { return (isOutOfBound(i, as) ? Option_1.none : Option_1.some(unsafeDeleteAt(i, as))); };
}
exports.deleteAt = deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/lib/ReadonlyArray'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
function modifyAt(i, f) {
    return function (as) { return (isOutOfBound(i, as) ? Option_1.none : Option_1.some(unsafeUpdateAt(i, f(as[i]), as))); };
}
exports.modifyAt = modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.5.0
 */
function reverse(as) {
    return as.slice().reverse();
}
exports.reverse = reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/lib/ReadonlyArray'
 * import { right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.5.0
 */
function rights(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
}
exports.rights = rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/lib/ReadonlyArray'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
function lefts(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
}
exports.lefts = lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/lib/ReadonlyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.5.0
 */
function sort(O) {
    return function (as) { return as.slice().sort(O.compare); };
}
exports.sort = sort;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 2.5.0
 */
function zipWith(fa, fb, f) {
    // tslint:disable-next-line: readonly-array
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
}
exports.zipWith = zipWith;
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @since 2.5.0
 */
function zip(fa, fb) {
    return zipWith(fa, fb, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
function unzip(as) {
    // tslint:disable-next-line: readonly-array
    var fa = [];
    // tslint:disable-next-line: readonly-array
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
}
exports.unzip = unzip;
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.5.0
 */
function rotate(n) {
    return function (as) {
        var len = as.length;
        if (n === 0 || len <= 1 || len === Math.abs(n)) {
            return as;
        }
        else if (n < 0) {
            return rotate(len + n)(as);
        }
        else {
            return as.slice(-n).concat(as.slice(0, len - n));
        }
    };
}
exports.rotate = rotate;
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `ReadonlyArray<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, [1, 2, 3]), true)
 * assert.strictEqual(elem(eqNumber)(4, [1, 2, 3]), false)
 *
 * @since 2.5.0
 */
function elem(E) {
    return function (a, as) {
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        var len = as.length;
        for (; i < len; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @since 2.5.0
 */
function uniq(E) {
    var elemS = elem(E);
    return function (as) {
        // tslint:disable-next-line: readonly-array
        var r = [];
        var len = as.length;
        var i = 0;
        for (; i < len; i++) {
            var a = as[i];
            if (!elemS(a, r)) {
                r.push(a);
            }
        }
        return len === r.length ? as : r;
    };
}
exports.uniq = uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/lib/ReadonlyArray'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'
 * import { pipe } from 'fp-ts/lib/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = pipe(ordString, contramap((p: Person) => p.name))
 * const byAge = pipe(ordNumber, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.5.0
 */
function sortBy(ords) {
    var M = Ord_1.getMonoid();
    return sort(ords.reduce(M.concat, M.empty));
}
exports.sortBy = sortBy;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/lib/Eq'
 * import { chop, spanLeft } from 'fp-ts/lib/ReadonlyArray'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.5.0
 */
function chop(f) {
    return function (as) {
        // tslint:disable-next-line: readonly-array
        var result = [];
        var cs = as;
        while (isNonEmpty(cs)) {
            var _a = f(cs), b = _a[0], c = _a[1];
            result.push(b);
            cs = c;
        }
        return result;
    };
}
exports.chop = chop;
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
function splitAt(n) {
    return function (as) { return [as.slice(0, n), as.slice(n)]; };
}
exports.splitAt = splitAt;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/lib/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.5.0
 */
function chunksOf(n) {
    var f = chop(splitAt(n));
    return function (as) { return (as.length === 0 ? exports.empty : isOutOfBound(n - 1, as) ? [as] : f(as)); };
}
exports.chunksOf = chunksOf;
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        if (input.length === 0) {
            return g.apply(void 0, scope) ? [f.apply(void 0, scope)] : exports.empty;
        }
        else {
            return function_1.pipe(input[0], exports.chain(function (x) { return go(snoc(scope, x), input.slice(1)); }));
        }
    };
    return go(exports.empty, input);
}
exports.comprehension = comprehension;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
 *
 * @since 2.5.0
 */
function union(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        return concat(xs, ys.filter(function (a) { return !elemE(a, xs); }));
    };
}
exports.union = union;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
 *
 * @since 2.5.0
 */
function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) { return xs.filter(function (a) { return elemE(a, ys); }); };
}
exports.intersection = intersection;
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/lib/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
 *
 * @since 2.5.0
 */
function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) { return xs.filter(function (a) { return !elemE(a, ys); }); };
}
exports.difference = difference;
/**
 * @since 2.5.0
 */
exports.of = function (a) { return [a]; };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
var partitionWithIndex_ = function (predicateWithIndex) { return function (fa) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var a = fa[i];
        if (predicateWithIndex(i, a)) {
            right.push(a);
        }
        else {
            left.push(a);
        }
    }
    return {
        left: left,
        right: right
    };
}; };
var partitionMapWithIndex_ = function (fa, f) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var e = f(i, fa[i]);
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
var zero_ = function () { return exports.empty; };
var filterMapWithIndex_ = function (f) { return function (fa) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < fa.length; i++) {
        var optionB = f(i, fa[i]);
        if (Option_1.isSome(optionB)) {
            result.push(optionB.value);
        }
    }
    return result;
}; };
var filterWithIndex_ = function (fa, predicateWithIndex) {
    return fa.filter(function (a, i) { return predicateWithIndex(i, a); });
};
/**
 * @since 3.0.0
 */
exports.traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * @since 3.0.0
 */
exports.sequence = function (F) { return function (ta) {
    return function_1.pipe(ta, exports.reduce(F.of(zero_()), function (fas, fa) {
        return function_1.pipe(fas, F.map(function (as) { return function (a) { return snoc(as, a); }; }), F.ap(fa));
    }));
}; };
/**
 * @since 3.0.0
 */
exports.traverseWithIndex = function (F) { return function (f) { return function (ta) {
    return function_1.pipe(ta, exports.reduceWithIndex(F.of(zero_()), function (i, fbs, a) {
        return function_1.pipe(fbs, F.map(function (bs) { return function (b) { return snoc(bs, b); }; }), F.ap(f(i, a)));
    }));
}; }; };
/**
 * @since 3.0.0
 */
exports.wither = function (F) {
    var traverseF = exports.traverse(F);
    return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.compact)); }; };
};
/**
 * @since 3.0.0
 */
exports.wilt = function (F) {
    var traverseF = exports.traverse(F);
    return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.separate)); }; };
};
/**
 * @since 2.5.0
 */
exports.alt = function (that) { return function (fa) {
    return concat(fa, that());
}; };
/**
 * @since 2.5.0
 */
exports.ap = function (fa) { return function (fab) {
    return flatten(function_1.pipe(fab, exports.map(function (f) { return function_1.pipe(fa, exports.map(f)); })));
}; };
/**
 * @since 2.5.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.5.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.5.0
 */
exports.chain = function (f) { return function (ma) {
    var outLen = 0;
    var l = ma.length;
    var temp = new Array(l);
    for (var i = 0; i < l; i++) {
        var e = ma[i];
        var arr = f(e);
        outLen += arr.length;
        temp[i] = arr;
    }
    var out = Array(outLen);
    var start = 0;
    for (var i = 0; i < l; i++) {
        var arr = temp[i];
        var l_1 = arr.length;
        for (var j = 0; j < l_1; j++) {
            out[j + start] = arr[j];
        }
        start += l_1;
    }
    return out;
}; };
/**
 * @since 2.5.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.5.0
 */
exports.map = function (f) { return function (fa) {
    return fa.map(function (a) { return f(a); });
}; };
/**
 * @since 2.5.0
 */
exports.mapWithIndex = function (f) { return function (fa) { return fa.map(function (a, i) { return f(i, a); }); }; };
/**
 * @since 2.5.0
 */
exports.separate = function (fa) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @since 2.5.0
 */
exports.filter = function (predicate) { return function (fa) {
    return fa.filter(predicate);
}; };
/**
 * @since 2.5.0
 */
exports.filterMap = function (f) { return filterMapWithIndex_(function (_, a) { return f(a); }); };
/**
 * @since 2.5.0
 */
exports.compact = 
/*#__PURE__*/
exports.filterMap(function_1.identity);
/**
 * @since 2.5.0
 */
exports.partition = function (predicate) { return function (fa) {
    return function_1.pipe(fa, partitionWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.partitionWithIndex = function (predicateWithIndex) { return function (fa) {
    return function_1.pipe(fa, partitionWithIndex_(predicateWithIndex));
}; };
/**
 * @since 2.5.0
 */
exports.partitionMap = function (f) { return function (fa) { return partitionMapWithIndex_(fa, function (_, a) { return f(a); }); }; };
/**
 * @since 2.5.0
 */
exports.partitionMapWithIndex = function (f) { return function (fa) {
    return partitionMapWithIndex_(fa, f);
}; };
/**
 * @since 2.5.0
 */
exports.filterMapWithIndex = filterMapWithIndex_;
/**
 * @since 2.5.0
 */
exports.filterWithIndex = function (predicateWithIndex) { return function (fa) {
    return filterWithIndex_(fa, predicateWithIndex);
}; };
/**
 * @since 2.5.0
 */
exports.extend = function (f) { return function (wa) { return wa.map(function (_, i, as) { return f(as.slice(i)); }); }; };
/**
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @since 2.5.0
 */
exports.foldMap = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @since 2.5.0
 */
exports.foldMapWithIndex = function (M) { return function (f) { return function (fa) { return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty); }; }; };
/**
 * @since 2.5.0
 */
exports.reduce = function (b, f) {
    return exports.reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @since 2.5.0
 */
exports.reduceWithIndex = function (b, f) { return function (fa) {
    var l = fa.length;
    var r = b;
    for (var i = 0; i < l; i++) {
        r = f(i, r, fa[i]);
    }
    return r;
}; };
/**
 * @since 2.5.0
 */
exports.reduceRight = function (b, f) {
    return exports.reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @since 2.5.0
 */
exports.reduceRightWithIndex = function (b, f) { return function (fa) { return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b); }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorReadonlyArray = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.functorWithIndexReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    mapWithIndex: exports.mapWithIndex
};
/**
 * @since 3.0.0
 */
exports.applyReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @since 3.0.0
 */
exports.applicativeReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @since 3.0.0
 */
exports.monadReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.unfold = function (b, f) {
    // tslint:disable-next-line: readonly-array
    var ret = [];
    var bb = b;
    while (true) {
        var mt = f(bb);
        if (Option_1.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            ret.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return ret;
};
/**
 * @since 3.0.0
 */
exports.unfoldableReadonlyArray = {
    URI: exports.URI,
    unfold: exports.unfold
};
/**
 * @since 3.0.0
 */
exports.compactableReadonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @since 3.0.0
 */
exports.filterableReadonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap
};
/**
 * @since 3.0.0
 */
exports.filterableWithIndexReadonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap,
    mapWithIndex: exports.mapWithIndex,
    partitionMapWithIndex: exports.partitionMapWithIndex,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: exports.filterWithIndex
};
/**
 * @since 3.0.0
 */
exports.foldableReadonlyArray = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @since 3.0.0
 */
exports.foldableWithIndexReadonlyArray = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    reduceWithIndex: exports.reduceWithIndex,
    foldMapWithIndex: exports.foldMapWithIndex,
    reduceRightWithIndex: exports.reduceRightWithIndex
};
/**
 * @since 3.0.0
 */
exports.altReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    alt: exports.alt
};
/**
 * @since 3.0.0
 */
exports.alternativeReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of,
    alt: exports.alt,
    zero: zero_
};
/**
 * @since 3.0.0
 */
exports.traversableReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: exports.traverse,
    sequence: exports.sequence
};
/**
 * @since 3.0.0
 */
exports.traversableWithIndexReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    mapWithIndex: exports.mapWithIndex,
    reduceWithIndex: exports.reduceWithIndex,
    foldMapWithIndex: exports.foldMapWithIndex,
    reduceRightWithIndex: exports.reduceRightWithIndex,
    traverse: exports.traverse,
    sequence: exports.sequence,
    traverseWithIndex: exports.traverseWithIndex
};
/**
 * @since 3.0.0
 */
exports.extendReadonlyArray = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @since 3.0.0
 */
exports.witherableReadonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: exports.map,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: exports.traverse,
    sequence: exports.sequence,
    wither: exports.wither,
    wilt: exports.wilt
};

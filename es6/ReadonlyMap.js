import { isLeft } from './Either';
import { fromEquals } from './Eq';
import { pipe } from './function';
import * as O from './Option';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyMap';
/**
 * @since 2.5.0
 */
export function fromMap(m) {
    return new Map(m);
}
/**
 * @since 2.5.0
 */
export function toMap(m) {
    return new Map(m);
}
/**
 * @since 2.5.0
 */
export function getShow(SK, SA) {
    return {
        show: function (m) {
            var elements = '';
            m.forEach(function (a, k) {
                elements += "[" + SK.show(k) + ", " + SA.show(a) + "], ";
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Map([" + elements + "])";
        }
    };
}
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
export function size(d) {
    return d.size;
}
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
export function isEmpty(d) {
    return d.size === 0;
}
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
export function member(E) {
    var lookupE = lookup(E);
    return function (k, m) { return O.isSome(lookupE(k, m)); };
}
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
export function elem(E) {
    return function (a, m) {
        var values = m.values();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var v = e.value;
            if (E.equals(a, v)) {
                return true;
            }
        }
        return false;
    };
}
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
export function keys(O) {
    return function (m) { return Array.from(m.keys()).sort(O.compare); };
}
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
export function values(O) {
    return function (m) { return Array.from(m.values()).sort(O.compare); };
}
/**
 * @since 2.5.0
 */
export function collect(O) {
    var keysO = keys(O);
    return function (f) { return function (m) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        var ks = keysO(m);
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            out.push(f(key, m.get(key)));
        }
        return out;
    }; };
}
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.5.0
 */
export function toReadonlyArray(O) {
    return collect(O)(function (k, a) { return [k, a]; });
}
export function toUnfoldable(ord, U) {
    var toArrayO = toReadonlyArray(ord);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? O.some([arr[b], b + 1]) : O.none); });
    };
}
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.5.0
 */
export function insertAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            var r = new Map(m);
            r.set(k, a);
            return r;
        }
        else if (found.value[1] !== a) {
            var r = new Map(m);
            r.set(found.value[0], a);
            return r;
        }
        return m;
    }; };
}
/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
export function deleteAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isSome(found)) {
            var r = new Map(m);
            r.delete(found.value[0]);
            return r;
        }
        return m;
    }; };
}
/**
 * @since 2.5.0
 */
export function updateAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            return O.none;
        }
        var r = new Map(m);
        r.set(found.value[0], a);
        return O.some(r);
    }; };
}
/**
 * @since 2.5.0
 */
export function modifyAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, f) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            return O.none;
        }
        var r = new Map(m);
        r.set(found.value[0], f(found.value[1]));
        return O.some(r);
    }; };
}
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export function pop(E) {
    var lookupE = lookup(E);
    var deleteAtE = deleteAt(E);
    return function (k) {
        var deleteAtEk = deleteAtE(k);
        return function (m) {
            return pipe(lookupE(k, m), O.map(function (a) { return [a, deleteAtEk(m)]; }));
        };
    };
}
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
export function lookupWithKey(E) {
    return function (k, m) {
        var entries = m.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, ka = _a[0], a = _a[1];
            if (E.equals(ka, k)) {
                return O.some([ka, a]);
            }
        }
        return O.none;
    };
}
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
export function lookup(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) {
        return pipe(lookupWithKeyE(k, m), O.map(function (_a) {
            var _ = _a[0], a = _a[1];
            return a;
        }));
    };
}
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.5.0
 */
export function isSubmap(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return function (d1, d2) {
        var entries = d1.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], a = _a[1];
            var d2OptA = lookupWithKeyS(k, d2);
            if (O.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
                return false;
            }
        }
        return true;
    };
}
/**
 * @since 2.5.0
 */
export var empty = new Map();
/**
 * @since 2.5.0
 */
export function getEq(SK, SA) {
    var isSubmap_ = isSubmap(SK, SA);
    return fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
}
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.5.0
 */
export function getMonoid(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            if (mx === empty) {
                return my;
            }
            if (my === empty) {
                return mx;
            }
            var r = new Map(mx);
            var entries = my.entries();
            var e;
            // tslint:disable-next-line: strict-boolean-expressions
            while (!(e = entries.next()).done) {
                var _a = e.value, k = _a[0], a = _a[1];
                var mxOptA = lookupWithKeyS(k, mx);
                if (O.isSome(mxOptA)) {
                    r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a));
                }
                else {
                    r.set(k, a);
                }
            }
            return r;
        },
        empty: empty
    };
}
/**
 * Create a map with one key/value pair
 *
 * @since 2.5.0
 */
export function singleton(k, a) {
    return new Map([[k, a]]);
}
export function fromFoldable(E, M, F) {
    return function (fka) {
        var lookupWithKeyE = lookupWithKey(E);
        return pipe(fka, F.reduce(new Map(), function (b, _a) {
            var k = _a[0], a = _a[1];
            var bOpt = lookupWithKeyE(k, b);
            if (O.isSome(bOpt)) {
                b.set(bOpt.value[0], M.concat(bOpt.value[1], a));
            }
            else {
                b.set(k, a);
            }
            return b;
        }));
    };
}
var partitionMapWithIndex_ = function (f) { return function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
}; };
var partitionWithIndex_ = function (p) { return function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            right.set(k, a);
        }
        else {
            left.set(k, a);
        }
    }
    return {
        left: left,
        right: right
    };
}; };
var filterMapWithIndex_ = function (f) { return function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var o = f(k, a);
        if (O.isSome(o)) {
            m.set(k, o.value);
        }
    }
    return m;
}; };
var filterWithIndex_ = function (p) { return function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            m.set(k, a);
        }
    }
    return m;
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
export var map = function (f) { return mapWithIndex(function (_, a) { return f(a); }); };
/**
 * @since 3.0.0
 */
export var functorReadonlyMap = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var mapWithIndex = function (f) { return function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
}; };
/**
 * @since 3.0.0
 */
export function getFunctorWithIndex() {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        mapWithIndex: mapWithIndex
    };
}
/**
 * @since 2.5.0
 */
export var compact = function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], oa = _a[1];
        if (O.isSome(oa)) {
            m.set(k, oa.value);
        }
    }
    return m;
};
/**
 * @since 2.5.0
 */
export var separate = function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], ei = _a[1];
        if (isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @since 3.0.0
 */
export var compactableReadonlyMap = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @since 2.5.0
 */
export var filter = function (predicate) { return function (fa) {
    return pipe(fa, filterWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
export var filterMap = function (f) { return filterMapWithIndex_(function (_, a) { return f(a); }); };
/**
 * @since 2.5.0
 */
export var partition = function (predicate) { return function (fa) {
    return pipe(fa, partitionWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
export var partitionMap = function (f) { return partitionMapWithIndex_(function (_, a) { return f(a); }); };
/**
 * @since 2.5.0
 */
export var filterableReadonlyMap = {
    URI: URI,
    map: map,
    compact: compact,
    separate: separate,
    filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap
};
var traverseWithIndex_ = function (F) {
    return function (f) { return function (ta) {
        var fkb = F.of(empty);
        var entries = ta.entries();
        var e;
        var _loop_1 = function () {
            var _a = e.value, k = _a[0], a = _a[1];
            fkb = pipe(fkb, F.map(function (kb) { return function (b) { return new Map(kb).set(k, b); }; }), F.ap(f(k, a)));
        };
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            _loop_1();
        }
        return fkb;
    }; };
};
/**
 * @since 3.0.0
 */
export function getFoldableWithIndex(O) {
    var keysO = keys(O);
    var reduceWithIndex = function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa.get(k));
        }
        return out;
    }; };
    var foldMapWithIndex = function (M) { return function (f) { return function (fa) {
        var out = M.empty;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa.get(k)));
        }
        return out;
    }; }; };
    var reduceRightWithIndex = function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa.get(k), out);
        }
        return out;
    }; };
    return {
        URI: URI,
        _E: undefined,
        reduce: function (b, f) { return reduceWithIndex(b, function (_, b, a) { return f(b, a); }); },
        foldMap: function (M) {
            var foldMapWithIndexM = foldMapWithIndex(M);
            return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
        },
        reduceRight: function (b, f) { return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); }); },
        reduceWithIndex: reduceWithIndex,
        foldMapWithIndex: foldMapWithIndex,
        reduceRightWithIndex: reduceRightWithIndex
    };
}
/**
 * @since 2.5.0
 */
export function getFilterableWithIndex() {
    return {
        URI: URI,
        _E: undefined,
        map: map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap,
        mapWithIndex: mapWithIndex,
        partitionMapWithIndex: partitionMapWithIndex_,
        partitionWithIndex: partitionWithIndex_,
        filterMapWithIndex: filterMapWithIndex_,
        filterWithIndex: filterWithIndex_
    };
}
var traverse_ = function (F) {
    var traverseWithIndexF = traverseWithIndex_(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
var sequence_ = function (F) {
    var traverseWithIndexF = traverseWithIndex_(F);
    return traverseWithIndexF(function (_, a) { return a; });
};
/**
 * @since 2.5.0
 */
export function getWitherable(O) {
    var F = getFoldableWithIndex(O);
    return {
        URI: URI,
        _E: undefined,
        map: map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap,
        reduce: F.reduce,
        foldMap: F.foldMap,
        reduceRight: F.reduceRight,
        reduceWithIndex: F.reduceWithIndex,
        foldMapWithIndex: F.foldMapWithIndex,
        reduceRightWithIndex: F.reduceRightWithIndex,
        traverse: traverse_,
        sequence: sequence_,
        mapWithIndex: mapWithIndex,
        traverseWithIndex: traverseWithIndex_,
        wilt: function (F) {
            var traverseF = traverse_(F);
            return function (f) { return function (wa) { return pipe(wa, traverseF(f), F.map(separate)); }; };
        },
        wither: function (F) {
            var traverseF = traverse_(F);
            return function (f) { return function (wa) { return pipe(wa, traverseF(f), F.map(compact)); }; };
        }
    };
}

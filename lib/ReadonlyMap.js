"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWitherable = exports.getFilterableWithIndex = exports.getFoldableWithIndex = exports.filterableReadonlyMap = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.compactableReadonlyMap = exports.separate = exports.compact = exports.getFunctorWithIndex = exports.mapWithIndex = exports.functorReadonlyMap = exports.map = exports.fromFoldable = exports.singleton = exports.getMonoid = exports.getEq = exports.empty = exports.isSubmap = exports.lookup = exports.lookupWithKey = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.insertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.values = exports.keys = exports.elem = exports.member = exports.isEmpty = exports.size = exports.getShow = exports.toMap = exports.fromMap = exports.URI = void 0;
var Either_1 = require("./Either");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var O = require("./Option");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyMap';
/**
 * @since 2.5.0
 */
function fromMap(m) {
    return new Map(m);
}
exports.fromMap = fromMap;
/**
 * @since 2.5.0
 */
function toMap(m) {
    return new Map(m);
}
exports.toMap = toMap;
/**
 * @since 2.5.0
 */
function getShow(SK, SA) {
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
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
function size(d) {
    return d.size;
}
exports.size = size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
function isEmpty(d) {
    return d.size === 0;
}
exports.isEmpty = isEmpty;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
function member(E) {
    var lookupE = lookup(E);
    return function (k, m) { return O.isSome(lookupE(k, m)); };
}
exports.member = member;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
function elem(E) {
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
exports.elem = elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
function keys(O) {
    return function (m) { return Array.from(m.keys()).sort(O.compare); };
}
exports.keys = keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
function values(O) {
    return function (m) { return Array.from(m.values()).sort(O.compare); };
}
exports.values = values;
/**
 * @since 2.5.0
 */
function collect(O) {
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
exports.collect = collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.5.0
 */
function toReadonlyArray(O) {
    return collect(O)(function (k, a) { return [k, a]; });
}
exports.toReadonlyArray = toReadonlyArray;
function toUnfoldable(ord, U) {
    var toArrayO = toReadonlyArray(ord);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? O.some([arr[b], b + 1]) : O.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.5.0
 */
function insertAt(E) {
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
exports.insertAt = insertAt;
/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
function deleteAt(E) {
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
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(E) {
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
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(E) {
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
exports.modifyAt = modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
function pop(E) {
    var lookupE = lookup(E);
    var deleteAtE = deleteAt(E);
    return function (k) {
        var deleteAtEk = deleteAtE(k);
        return function (m) {
            return function_1.pipe(lookupE(k, m), O.map(function (a) { return [a, deleteAtEk(m)]; }));
        };
    };
}
exports.pop = pop;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
function lookupWithKey(E) {
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
exports.lookupWithKey = lookupWithKey;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
function lookup(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) {
        return function_1.pipe(lookupWithKeyE(k, m), O.map(function (_a) {
            var _ = _a[0], a = _a[1];
            return a;
        }));
    };
}
exports.lookup = lookup;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.5.0
 */
function isSubmap(SK, SA) {
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
exports.isSubmap = isSubmap;
/**
 * @since 2.5.0
 */
exports.empty = new Map();
/**
 * @since 2.5.0
 */
function getEq(SK, SA) {
    var isSubmap_ = isSubmap(SK, SA);
    return Eq_1.fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
}
exports.getEq = getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.5.0
 */
function getMonoid(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            if (mx === exports.empty) {
                return my;
            }
            if (my === exports.empty) {
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
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.5.0
 */
function singleton(k, a) {
    return new Map([[k, a]]);
}
exports.singleton = singleton;
function fromFoldable(E, M, F) {
    return function (fka) {
        var lookupWithKeyE = lookupWithKey(E);
        return function_1.pipe(fka, F.reduce(new Map(), function (b, _a) {
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
exports.fromFoldable = fromFoldable;
var partitionMapWithIndex_ = function (f) { return function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (Either_1.isLeft(ei)) {
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
exports.map = function (f) { return exports.mapWithIndex(function (_, a) { return f(a); }); };
/**
 * @since 3.0.0
 */
exports.functorReadonlyMap = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.mapWithIndex = function (f) { return function (fa) {
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
function getFunctorWithIndex() {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        mapWithIndex: exports.mapWithIndex
    };
}
exports.getFunctorWithIndex = getFunctorWithIndex;
/**
 * @since 2.5.0
 */
exports.compact = function (fa) {
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
exports.separate = function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], ei = _a[1];
        if (Either_1.isLeft(ei)) {
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
exports.compactableReadonlyMap = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @since 2.5.0
 */
exports.filter = function (predicate) { return function (fa) {
    return function_1.pipe(fa, filterWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.filterMap = function (f) { return filterMapWithIndex_(function (_, a) { return f(a); }); };
/**
 * @since 2.5.0
 */
exports.partition = function (predicate) { return function (fa) {
    return function_1.pipe(fa, partitionWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.partitionMap = function (f) { return partitionMapWithIndex_(function (_, a) { return f(a); }); };
/**
 * @since 2.5.0
 */
exports.filterableReadonlyMap = {
    URI: exports.URI,
    map: exports.map,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap
};
var traverseWithIndex_ = function (F) {
    return function (f) { return function (ta) {
        var fkb = F.of(exports.empty);
        var entries = ta.entries();
        var e;
        var _loop_1 = function () {
            var _a = e.value, k = _a[0], a = _a[1];
            fkb = function_1.pipe(fkb, F.map(function (kb) { return function (b) { return new Map(kb).set(k, b); }; }), F.ap(f(k, a)));
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
function getFoldableWithIndex(O) {
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
        URI: exports.URI,
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
exports.getFoldableWithIndex = getFoldableWithIndex;
/**
 * @since 2.5.0
 */
function getFilterableWithIndex() {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        compact: exports.compact,
        separate: exports.separate,
        filter: exports.filter,
        filterMap: exports.filterMap,
        partition: exports.partition,
        partitionMap: exports.partitionMap,
        mapWithIndex: exports.mapWithIndex,
        partitionMapWithIndex: partitionMapWithIndex_,
        partitionWithIndex: partitionWithIndex_,
        filterMapWithIndex: filterMapWithIndex_,
        filterWithIndex: filterWithIndex_
    };
}
exports.getFilterableWithIndex = getFilterableWithIndex;
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
function getWitherable(O) {
    var F = getFoldableWithIndex(O);
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.map,
        compact: exports.compact,
        separate: exports.separate,
        filter: exports.filter,
        filterMap: exports.filterMap,
        partition: exports.partition,
        partitionMap: exports.partitionMap,
        reduce: F.reduce,
        foldMap: F.foldMap,
        reduceRight: F.reduceRight,
        reduceWithIndex: F.reduceWithIndex,
        foldMapWithIndex: F.foldMapWithIndex,
        reduceRightWithIndex: F.reduceRightWithIndex,
        traverse: traverse_,
        sequence: sequence_,
        mapWithIndex: exports.mapWithIndex,
        traverseWithIndex: traverseWithIndex_,
        wilt: function (F) {
            var traverseF = traverse_(F);
            return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.separate)); }; };
        },
        wither: function (F) {
            var traverseF = traverse_(F);
            return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.compact)); }; };
        }
    };
}
exports.getWitherable = getWitherable;

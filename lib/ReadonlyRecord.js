"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readonlyRecord = exports.separate = exports.compact = exports.reduceRight = exports.reduce = exports.partitionMap = exports.partition = exports.foldMap = exports.filterMap = exports.filter = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.empty = exports.lookup = exports.getMonoid = exports.getEq = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.hasOwnProperty = exports.insertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.keys = exports.isEmpty = exports.size = exports.getShow = exports.toRecord = exports.fromRecord = exports.URI = void 0;
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var Option_1 = require("./Option");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyRecord';
/**
 * @since 2.5.0
 */
function fromRecord(r) {
    return Object.assign({}, r);
}
exports.fromRecord = fromRecord;
/**
 * @since 2.5.0
 */
function toRecord(r) {
    return Object.assign({}, r);
}
exports.toRecord = toRecord;
/**
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
function size(r) {
    return Object.keys(r).length;
}
exports.size = size;
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
function isEmpty(r) {
    return Object.keys(r).length === 0;
}
exports.isEmpty = isEmpty;
/**
 * @since 2.5.0
 */
function keys(r) {
    return Object.keys(r).sort();
}
exports.keys = keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
function collect(f) {
    return function (r) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        for (var _i = 0, _a = keys(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    };
}
exports.collect = collect;
/**
 * @since 2.5.0
 */
exports.toReadonlyArray = collect(function (k, a) { return [k, a]; });
function toUnfoldable(U) {
    return function (r) {
        var arr = exports.toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
exports.insertAt = insertAt;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @since 2.5.0
 */
function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r, k);
}
exports.hasOwnProperty = hasOwnProperty;
function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        if (r[k] === a) {
            return Option_1.some(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return Option_1.some(out);
    };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return Option_1.some(out);
    };
}
exports.modifyAt = modifyAt;
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return Option_1.isNone(oa) ? Option_1.none : Option_1.some([oa.value, deleteAtk(r)]);
    };
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.5.0
 */
function isSubrecord(E) {
    return function (x, y) {
        for (var k in x) {
            if (!_hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubrecord = isSubrecord;
function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return Eq_1.fromEquals(function (x, y) { return isSubrecordE(x, y) && isSubrecordE(y, x); });
}
exports.getEq = getEq;
function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === exports.empty) {
                return y;
            }
            if (y === exports.empty) {
                return x;
            }
            var keys = Object.keys(y);
            var len = keys.length;
            if (len === 0) {
                return x;
            }
            var r = __assign({}, x);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k];
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.5.0
 */
function lookup(k, r) {
    return _hasOwnProperty.call(r, k) ? Option_1.some(r[k]) : Option_1.none;
}
exports.lookup = lookup;
/**
 * @since 2.5.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return function (fa) {
        var out = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            out[key] = f(key, fa[key]);
        }
        return out;
    };
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
exports.map = map;
function reduceWithIndex(b, f) {
    return function (fa) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = f(k, out, fa[k]);
        }
        return out;
    };
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return function (f) { return function (fa) {
        var out = M.empty;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = M.concat(out, f(k, fa[k]));
        }
        return out;
    }; };
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return function (fa) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = keys[i];
            out = f(k, fa[k], out);
        }
        return out;
    };
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.5.0
 */
function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
exports.singleton = singleton;
function traverseWithIndex(F) {
    return traverseWithIndex_(F);
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
exports.traverse = traverse;
function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
exports.sequence = sequence;
function partitionMapWithIndex(f) {
    return partitionMapWithIndex_(f);
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return partitionWithIndex_(predicateWithIndex);
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return filterMapWithIndex_(f);
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return filterWithIndex_(predicateWithIndex);
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, function_1.identity); };
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return function_1.pipe(ta, F.reduce({}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        }));
    };
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.every = every;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
exports.some = some;
/**
 * @since 2.5.0
 */
function elem(E) {
    return function (a, fa) {
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
var partitionMapWithIndex_ = function (f) { return function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var e = f(key, fa[key]);
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
}; };
var partitionWithIndex_ = function (predicateWithIndex) { return function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
        var key = keys_3[_i];
        var a = fa[key];
        if (predicateWithIndex(key, a)) {
            right[key] = a;
        }
        else {
            left[key] = a;
        }
    }
    return {
        left: left,
        right: right
    };
}; };
var filterMapWithIndex_ = function (f) { return function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
        var key = keys_4[_i];
        var optionB = f(key, fa[key]);
        if (Option_1.isSome(optionB)) {
            r[key] = optionB.value;
        }
    }
    return r;
}; };
var filterWithIndex_ = function (predicateWithIndex) { return function (fa) {
    var out = {};
    var changed = false;
    for (var key in fa) {
        if (_hasOwnProperty.call(fa, key)) {
            var a = fa[key];
            if (predicateWithIndex(key, a)) {
                out[key] = a;
            }
            else {
                changed = true;
            }
        }
    }
    return changed ? out : fa;
}; };
var traverseWithIndex_ = function (F) { return function (f) { return function (ta) {
    var ks = keys(ta);
    if (ks.length === 0) {
        return F.of(exports.empty);
    }
    var fr = F.of({});
    var _loop_1 = function (key) {
        fr = function_1.pipe(fr, F.map(function (r) { return function (b) {
            r[key] = b;
            return r;
        }; }), F.ap(f(key, ta[key])));
    };
    for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
        var key = ks_1[_i];
        _loop_1(key);
    }
    return fr;
}; }; };
/**
 * @since 2.5.0
 */
exports.filter = function (predicate) { return function (fa) {
    return function_1.pipe(fa, filterWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.filterMap = function (f) { return function (fa) {
    return function_1.pipe(fa, filterMapWithIndex_(function (_, a) { return f(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @since 2.5.0
 */
exports.partition = function (predicate) { return function (fa) {
    return function_1.pipe(fa, partitionWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.partitionMap = function (f) { return function (fa) {
    return function_1.pipe(fa, partitionMapWithIndex_(function (_, a) { return f(a); }));
}; };
/**
 * @since 2.5.0
 */
exports.reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @since 2.5.0
 */
exports.reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @since 2.5.0
 */
exports.compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        var optionA = fa[key];
        if (Option_1.isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
/**
 * @since 2.5.0
 */
exports.separate = function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
        var key = keys_6[_i];
        var e = fa[key];
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.readonlyRecord = {
    URI: exports.URI,
    map: map,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight,
    traverse: traverse,
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: exports.filter,
    filterMap: exports.filterMap,
    partition: exports.partition,
    partitionMap: exports.partitionMap,
    mapWithIndex: mapWithIndex,
    reduceWithIndex: reduceWithIndex,
    foldMapWithIndex: foldMapWithIndex,
    reduceRightWithIndex: reduceRightWithIndex,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    wither: function (F) {
        var traverseF = traverse(F);
        return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.compact)); }; };
    },
    wilt: function (F) {
        var traverseF = traverse(F);
        return function (f) { return function (wa) { return function_1.pipe(wa, traverseF(f), F.map(exports.separate)); }; };
    },
    traverseWithIndex: traverseWithIndex_
};

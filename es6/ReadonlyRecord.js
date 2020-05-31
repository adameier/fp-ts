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
import { fromEquals } from './Eq';
import { identity, pipe } from './function';
import { isNone, isSome, none, some as optionSome } from './Option';
/**
 * @since 2.5.0
 */
export var URI = 'ReadonlyRecord';
/**
 * @since 2.5.0
 */
export function fromRecord(r) {
    return Object.assign({}, r);
}
/**
 * @since 2.5.0
 */
export function toRecord(r) {
    return Object.assign({}, r);
}
/**
 * @since 2.5.0
 */
export function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
export function size(r) {
    return Object.keys(r).length;
}
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
export function isEmpty(r) {
    return Object.keys(r).length === 0;
}
/**
 * @since 2.5.0
 */
export function keys(r) {
    return Object.keys(r).sort();
}
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
export function collect(f) {
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
/**
 * @since 2.5.0
 */
export var toReadonlyArray = collect(function (k, a) { return [k, a]; });
export function toUnfoldable(U) {
    return function (r) {
        var arr = toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? optionSome([arr[b], b + 1]) : none); });
    };
}
export function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @since 2.5.0
 */
export function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r, k);
}
export function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
/**
 * @since 2.5.0
 */
export function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        if (r[k] === a) {
            return optionSome(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return optionSome(out);
    };
}
/**
 * @since 2.5.0
 */
export function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return optionSome(out);
    };
}
export function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return isNone(oa) ? none : optionSome([oa.value, deleteAtk(r)]);
    };
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.5.0
 */
export function isSubrecord(E) {
    return function (x, y) {
        for (var k in x) {
            if (!_hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    };
}
export function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return fromEquals(function (x, y) { return isSubrecordE(x, y) && isSubrecordE(y, x); });
}
export function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === empty) {
                return y;
            }
            if (y === empty) {
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
        empty: empty
    };
}
/**
 * Lookup the value for a key in a record
 *
 * @since 2.5.0
 */
export function lookup(k, r) {
    return _hasOwnProperty.call(r, k) ? optionSome(r[k]) : none;
}
/**
 * @since 2.5.0
 */
export var empty = {};
export function mapWithIndex(f) {
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
export function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
export function reduceWithIndex(b, f) {
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
export function foldMapWithIndex(M) {
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
export function reduceRightWithIndex(b, f) {
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
/**
 * Create a record with one key/value pair
 *
 * @since 2.5.0
 */
export function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
export function traverseWithIndex(F) {
    return traverseWithIndex_(F);
}
export function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
export function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
export function partitionMapWithIndex(f) {
    return partitionMapWithIndex_(f);
}
export function partitionWithIndex(predicateWithIndex) {
    return partitionWithIndex_(predicateWithIndex);
}
export function filterMapWithIndex(f) {
    return filterMapWithIndex_(f);
}
export function filterWithIndex(predicateWithIndex) {
    return filterWithIndex_(predicateWithIndex);
}
export function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, identity); };
}
export function fromFoldableMap(M, F) {
    return function (ta, f) {
        return pipe(ta, F.reduce({}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        }));
    };
}
/**
 * @since 2.5.0
 */
export function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
/**
 * @since 2.5.0
 */
export function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
/**
 * @since 2.5.0
 */
export function elem(E) {
    return function (a, fa) {
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
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
        if (isSome(optionB)) {
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
    var keys = Object.keys(ta);
    if (keys.length === 0) {
        return F.of(empty);
    }
    var fr = F.of({});
    var _loop_1 = function (key) {
        fr = pipe(fr, F.map(function (r) { return function (b) {
            r[key] = b;
            return r;
        }; }), F.ap(f(key, ta[key])));
    };
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        _loop_1(key);
    }
    return fr;
}; }; };
/**
 * @since 2.5.0
 */
export var filter = function (predicate) { return function (fa) {
    return pipe(fa, filterWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
export var filterMap = function (f) { return function (fa) {
    return pipe(fa, filterMapWithIndex_(function (_, a) { return f(a); }));
}; };
/**
 * @since 2.5.0
 */
export var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @since 2.5.0
 */
export var partition = function (predicate) { return function (fa) {
    return pipe(fa, partitionWithIndex_(function (_, a) { return predicate(a); }));
}; };
/**
 * @since 2.5.0
 */
export var partitionMap = function (f) { return function (fa) {
    return pipe(fa, partitionMapWithIndex_(function (_, a) { return f(a); }));
}; };
/**
 * @since 2.5.0
 */
export var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @since 2.5.0
 */
export var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @since 2.5.0
 */
export var compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
        var key = keys_6[_i];
        var optionA = fa[key];
        if (isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
/**
 * @since 2.5.0
 */
export var separate = function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
        var key = keys_7[_i];
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
export var readonlyRecord = {
    URI: URI,
    map: map,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap,
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
        return function (f) { return function (wa) { return pipe(wa, traverseF(f), F.map(compact)); }; };
    },
    wilt: function (F) {
        var traverseF = traverse(F);
        return function (f) { return function (wa) { return pipe(wa, traverseF(f), F.map(separate)); }; };
    },
    traverseWithIndex: traverseWithIndex_
};

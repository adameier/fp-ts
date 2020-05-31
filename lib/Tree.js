"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comonadTree = exports.extendTree = exports.traversableTree = exports.foldableTree = exports.monadTree = exports.applicativeTree = exports.applyTree = exports.functorTree = exports.sequence = exports.traverse = exports.extract = exports.reduceRight = exports.reduce = exports.map = exports.foldMap = exports.flatten = exports.duplicate = exports.extend = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.fold = exports.elem = exports.unfoldForestM = exports.unfoldTreeM = exports.unfoldForest = exports.unfoldTree = exports.drawTree = exports.drawForest = exports.getEq = exports.getShow = exports.make = exports.URI = void 0;
var A = require("./Array");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
// tslint:disable:readonly-array
/**
 * @since 2.0.0
 */
exports.URI = 'Tree';
/**
 * @since 2.0.0
 */
function make(value, forest) {
    if (forest === void 0) { forest = A.empty; }
    return {
        value: value,
        forest: forest
    };
}
exports.make = make;
/**
 * @since 2.0.0
 */
function getShow(S) {
    var show = function (t) {
        return t.forest === A.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function getEq(E) {
    var SA;
    var R = Eq_1.fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = A.getEq(R);
    return R;
}
exports.getEq = getEq;
var draw = function (indentation, forest) {
    var r = '';
    var len = forest.length;
    var tree;
    for (var i = 0; i < len; i++) {
        tree = forest[i];
        var isLast = i === len - 1;
        r += indentation + (isLast ? '└' : '├') + '─ ' + tree.value;
        r += draw(indentation + (len > 1 && !isLast ? '│  ' : '   '), tree.forest);
    }
    return r;
};
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
function drawForest(forest) {
    return draw('\n', forest);
}
exports.drawForest = drawForest;
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   make('b'),
 *   make('c'),
 *   make('d', [make('e'), make('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
exports.drawTree = drawTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
exports.unfoldTree = unfoldTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
exports.unfoldForest = unfoldForest;
function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) {
        return function_1.pipe(f(b), M.chain(function (_a) {
            var a = _a[0], bs = _a[1];
            return function_1.pipe(unfoldForestMM(bs, f), M.chain(function (ts) { return M.of({ value: a, forest: ts }); }));
        }));
    };
}
exports.unfoldTreeM = unfoldTreeM;
function unfoldForestM(M) {
    var traverseM = A.traverse(M);
    return function (bs, f) {
        return function_1.pipe(bs, traverseM(function (b) { return unfoldTreeM(M)(b, f); }));
    };
}
exports.unfoldForestM = unfoldForestM;
/**
 * @since 2.0.0
 */
function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
exports.elem = elem;
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/lib/Tree'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: Array<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: Array<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @since 2.6.0
 */
function fold(f) {
    var go = function (tree) { return f(tree.value, tree.forest.map(go)); };
    return go;
}
exports.fold = fold;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.ap = function (fa) { return function (fab) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
}; };
/**
 * @since 2.0.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.0.0
 */
exports.chain = function (f) { return function (ma) {
    var _a = f(ma.value), value = _a.value, forest = _a.forest;
    var concat = A.getMonoid().concat;
    return {
        value: value,
        forest: concat(forest, ma.forest.map(function (t) { return function_1.pipe(t, exports.chain(f)); }))
    };
}; };
/**
 * @since 2.0.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
exports.extend = function (f) { return function (wa) { return ({
    value: f(wa),
    forest: wa.forest.map(exports.extend(f))
}); }; };
/**
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * @since 2.0.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.0.0
 */
exports.foldMap = function (M) { return function (f) {
    return exports.reduce(M.empty, function (acc, a) { return M.concat(acc, f(a)); });
}; };
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (fa) { return ({
    value: f(fa.value),
    forest: fa.forest.map(function (t) { return function_1.pipe(t, exports.map(f)); })
}); }; };
/**
 * @since 2.0.0
 */
exports.reduce = function (b, f) { return function (fa) {
    var r = f(b, fa.value);
    var len = fa.forest.length;
    for (var i = 0; i < len; i++) {
        r = function_1.pipe(fa.forest[i], exports.reduce(r, f));
    }
    return r;
}; };
/**
 * @since 2.0.0
 */
exports.reduceRight = function (b, f) { return function (fa) {
    var r = b;
    var len = fa.forest.length;
    for (var i = len - 1; i >= 0; i--) {
        r = function_1.pipe(fa.forest[i], exports.reduceRight(r, f));
    }
    return f(fa.value, r);
}; };
/**
 * @since 2.6.2
 */
exports.extract = function (wa) { return wa.value; };
/**
 * @since 3.0.0
 */
exports.traverse = function (F) {
    var traverseF = A.traverse(F);
    var r = function (f) { return function (ta) {
        return function_1.pipe(f(ta.value), F.map(function (value) { return function (forest) { return ({
            value: value,
            forest: forest
        }); }; }), F.ap(function_1.pipe(ta.forest, traverseF(r(f)))));
    }; };
    return r;
};
/**
 * @since 3.0.0
 */
exports.sequence = function (F) {
    var traverseF = exports.traverse(F);
    return traverseF(function_1.identity);
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorTree = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyTree = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
var of = function (a) { return make(a); };
/**
 * @since 3.0.0
 */
exports.applicativeTree = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of
};
/**
 * @since 3.0.0
 */
exports.monadTree = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.foldableTree = {
    URI: exports.URI,
    reduce: exports.reduce,
    foldMap: exports.foldMap,
    reduceRight: exports.reduceRight
};
/**
 * @since 3.0.0
 */
exports.traversableTree = {
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
exports.extendTree = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @since 3.0.0
 */
exports.comonadTree = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend,
    extract: exports.extract
};

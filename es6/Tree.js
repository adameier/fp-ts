import * as RA from './ReadonlyArray';
import { fromEquals } from './Eq';
import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'Tree';
/**
 * @since 2.0.0
 */
export function make(value, forest) {
    if (forest === void 0) { forest = RA.empty; }
    return {
        value: value,
        forest: forest
    };
}
/**
 * @since 2.0.0
 */
export function getShow(S) {
    var show = function (t) {
        return t.forest === RA.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
/**
 * @since 2.0.0
 */
export function getEq(E) {
    var SA;
    var R = fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = RA.getEq(R);
    return R;
}
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
export function drawForest(forest) {
    return draw('\n', forest);
}
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
export function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
export function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) {
        return pipe(f(b), M.chain(function (_a) {
            var a = _a[0], bs = _a[1];
            return pipe(unfoldForestMM(bs, f), M.chain(function (ts) { return M.of({ value: a, forest: ts }); }));
        }));
    };
}
export function unfoldForestM(M) {
    var traverseM = RA.traverse(M);
    return function (bs, f) {
        return pipe(bs, traverseM(function (b) { return unfoldTreeM(M)(b, f); }));
    };
}
/**
 * @since 2.0.0
 */
export function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
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
 * const sum = (as: ReadonlyArray<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: ReadonlyArray<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: ReadonlyArray<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: ReadonlyArray<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @since 2.6.0
 */
export function fold(f) {
    var go = function (tree) { return f(tree.value, tree.forest.map(go)); };
    return go;
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
}; };
/**
 * @since 2.0.0
 */
export var apFirst = function (fb) { return function (fa) {
    return pipe(fa, map(function (a) { return function () { return a; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var apSecond = function (fb) { return function (fa) {
    return pipe(fa, map(function () { return function (b) { return b; }; }), ap(fb));
}; };
/**
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) {
    var _a = f(ma.value), value = _a.value, forest = _a.forest;
    var concat = RA.getMonoid().concat;
    return {
        value: value,
        forest: concat(forest, ma.forest.map(function (t) { return pipe(t, chain(f)); }))
    };
}; };
/**
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) { return ({
    value: f(wa),
    forest: wa.forest.map(extend(f))
}); }; };
/**
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
extend(identity);
/**
 * @since 2.0.0
 */
export var flatten = chain(identity);
/**
 * @since 2.0.0
 */
export var foldMap = function (M) { return function (f) {
    return reduce(M.empty, function (acc, a) { return M.concat(acc, f(a)); });
}; };
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return ({
    value: f(fa.value),
    forest: fa.forest.map(function (t) { return pipe(t, map(f)); })
}); }; };
/**
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) {
    var r = f(b, fa.value);
    var len = fa.forest.length;
    for (var i = 0; i < len; i++) {
        r = pipe(fa.forest[i], reduce(r, f));
    }
    return r;
}; };
/**
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    var r = b;
    var len = fa.forest.length;
    for (var i = len - 1; i >= 0; i--) {
        r = pipe(fa.forest[i], reduceRight(r, f));
    }
    return f(fa.value, r);
}; };
/**
 * @since 2.6.2
 */
export var extract = function (wa) { return wa.value; };
/**
 * @since 3.0.0
 */
export var traverse = function (F) {
    var traverseF = RA.traverse(F);
    var r = function (f) { return function (ta) {
        return pipe(f(ta.value), F.map(function (value) { return function (forest) { return ({
            value: value,
            forest: forest
        }); }; }), F.ap(pipe(ta.forest, traverseF(r(f)))));
    }; };
    return r;
};
/**
 * @since 3.0.0
 */
export var sequence = function (F) {
    var traverseF = traverse(F);
    return traverseF(identity);
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorTree = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var applyTree = {
    URI: URI,
    map: map,
    ap: ap
};
var of = function (a) { return make(a); };
/**
 * @since 3.0.0
 */
export var applicativeTree = {
    URI: URI,
    map: map,
    ap: ap,
    of: of
};
/**
 * @since 3.0.0
 */
export var monadTree = {
    URI: URI,
    map: map,
    ap: ap,
    of: of,
    chain: chain
};
/**
 * @since 3.0.0
 */
export var foldableTree = {
    URI: URI,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight
};
/**
 * @since 3.0.0
 */
export var traversableTree = {
    URI: URI,
    map: map,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};
/**
 * @since 3.0.0
 */
export var extendTree = {
    URI: URI,
    map: map,
    extend: extend
};
/**
 * @since 3.0.0
 */
export var comonadTree = {
    URI: URI,
    map: map,
    extend: extend,
    extract: extract
};

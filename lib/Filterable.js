"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterableComposition = void 0;
/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
var Compactable_1 = require("./Compactable");
var function_1 = require("./function");
var Option_1 = require("./Option");
function getFilterableComposition(F, G) {
    var CC = Compactable_1.getCompactableComposition(F, G);
    var FC = {
        map: CC.map,
        compact: CC.compact,
        separate: CC.separate,
        partitionMap: function (f) { return function (fga) {
            return {
                left: function_1.pipe(fga, FC.filterMap(function (a) { return Option_1.getLeft(f(a)); })),
                right: function_1.pipe(fga, FC.filterMap(function (a) { return Option_1.getRight(f(a)); }))
            };
        }; },
        partition: function (p) { return function (fga) {
            return {
                left: function_1.pipe(fga, FC.filter(function (a) { return !p(a); })),
                right: function_1.pipe(fga, FC.filter(p))
            };
        }; },
        filterMap: function (f) { return function (fga) { return function_1.pipe(fga, F.map(G.filterMap(f))); }; },
        filter: function (f) { return function (fga) { return function_1.pipe(fga, F.map(G.filter(f))); }; }
    };
    return FC;
}
exports.getFilterableComposition = getFilterableComposition;

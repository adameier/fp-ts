"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partitionMapComposition = exports.partitionComposition = exports.filterMapComposition = exports.filterComposition = void 0;
var function_1 = require("./function");
var Option_1 = require("./Option");
function filterComposition(F, G) {
    return function (predicate) { return F.map(G.filter(predicate)); };
}
exports.filterComposition = filterComposition;
function filterMapComposition(F, G) {
    return function_1.flow(G.filterMap, F.map);
}
exports.filterMapComposition = filterMapComposition;
function partitionComposition(F, G) {
    var filter = filterComposition(F, G);
    return function (predicate) { return function (fga) { return ({
        left: function_1.pipe(fga, filter(function (a) { return !predicate(a); })),
        right: function_1.pipe(fga, filter(predicate))
    }); }; };
}
exports.partitionComposition = partitionComposition;
function partitionMapComposition(F, G) {
    var filterMap = filterMapComposition(F, G);
    return function (f) { return function (fga) {
        return {
            left: function_1.pipe(fga, filterMap(function (a) { return Option_1.getLeft(f(a)); })),
            right: function_1.pipe(fga, filterMap(function (a) { return Option_1.getRight(f(a)); }))
        };
    }; };
}
exports.partitionMapComposition = partitionMapComposition;

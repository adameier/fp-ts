"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompactableComposition = void 0;
var Functor_1 = require("./Functor");
var Option_1 = require("./Option");
var function_1 = require("./function");
function getCompactableComposition(F, G) {
    var FC = Functor_1.getFunctorComposition(F, G);
    var CC = {
        map: FC.map,
        compact: function (fga) { return function_1.pipe(fga, F.map(G.compact)); },
        separate: function (fge) {
            var left = CC.compact(function_1.pipe(fge, FC.map(Option_1.getLeft)));
            var right = CC.compact(function_1.pipe(fge, FC.map(Option_1.getRight)));
            return { left: left, right: right };
        }
    };
    return CC;
}
exports.getCompactableComposition = getCompactableComposition;

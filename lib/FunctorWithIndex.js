"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctorWithIndexComposition = void 0;
var Functor_1 = require("./Functor");
var function_1 = require("./function");
function getFunctorWithIndexComposition(F, G) {
    var FC = Functor_1.getFunctorComposition(F, G);
    return {
        map: FC.map,
        mapWithIndex: function (f) {
            return F.mapWithIndex(function (fi, ga) {
                return function_1.pipe(ga, G.mapWithIndex(function (gi, a) { return f([fi, gi], a); }));
            });
        }
    };
}
exports.getFunctorWithIndexComposition = getFunctorWithIndexComposition;

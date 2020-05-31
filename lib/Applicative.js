"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicativeComposition = void 0;
var Functor_1 = require("./Functor");
var function_1 = require("./function");
function getApplicativeComposition(F, G) {
    var FG = Functor_1.getFunctorComposition(F, G);
    return {
        map: FG.map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fga) { return function (fgab) {
            return function_1.pipe(fgab, F.map(function (h) { return function (ga) { return function_1.pipe(h, G.ap(ga)); }; }), F.ap(fga));
        }; }
    };
}
exports.getApplicativeComposition = getApplicativeComposition;

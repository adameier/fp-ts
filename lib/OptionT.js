"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionM = void 0;
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var Option_1 = require("./Option");
function getOptionM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Option_1.applicativeOption);
    var fnone = M.of(Option_1.none);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (f) { return M.chain(Option_1.fold(function () { return fnone; }, f)); },
        alt: function (that) { return M.chain(Option_1.fold(that, function (a) { return M.of(Option_1.some(a)); })); },
        fold: function (onNone, onSome) { return M.chain(Option_1.fold(onNone, onSome)); },
        getOrElse: function (onNone) { return M.chain(Option_1.fold(onNone, M.of)); },
        fromM: M.map(Option_1.some),
        none: function () { return fnone; }
    };
}
exports.getOptionM = getOptionM;

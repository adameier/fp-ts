"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = exports.map = exports.of = exports.getEitherM = void 0;
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var E = require("./Either");
function getEitherM(M) {
    var A = Applicative_1.getApplicativeComposition(M, E.applicativeEither);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (f) { return M.chain(function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); },
        alt: function (that) { return M.chain(function (e) { return (E.isLeft(e) ? that() : A.of(e.right)); }); },
        bimap: function (f, g) { return M.map(E.bifunctorEither.bimap(f, g)); },
        mapLeft: function (f) { return M.map(E.bifunctorEither.mapLeft(f)); },
        fold: function (onLeft, onRight) { return M.chain(E.fold(onLeft, onRight)); },
        getOrElse: function (onLeft) { return M.chain(E.fold(onLeft, M.of)); },
        orElse: function (f) { return M.chain(E.fold(f, function (a) { return A.of(a); })); },
        swap: M.map(E.swap),
        rightM: M.map(E.right),
        leftM: M.map(E.left),
        left: function (e) { return M.of(E.left(e)); }
    };
}
exports.getEitherM = getEitherM;
function of(A) {
    return function (a) { return A.of(E.right(a)); };
}
exports.of = of;
function map(F) {
    return function (f) { return F.map(E.map(f)); };
}
exports.map = map;
function chain(M) {
    return function (f) { return M.chain(function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); };
}
exports.chain = chain;

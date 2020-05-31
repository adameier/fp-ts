"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEitherM = void 0;
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
function getEitherM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.applicativeEither);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (f) { return M.chain(function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); }); },
        alt: function (that) { return M.chain(function (e) { return (Either_1.isLeft(e) ? that() : A.of(e.right)); }); },
        bimap: function (f, g) { return M.map(Either_1.bifunctorEither.bimap(f, g)); },
        mapLeft: function (f) { return M.map(Either_1.bifunctorEither.mapLeft(f)); },
        fold: function (onLeft, onRight) { return M.chain(Either_1.fold(onLeft, onRight)); },
        getOrElse: function (onLeft) { return M.chain(Either_1.fold(onLeft, M.of)); },
        orElse: function (f) { return M.chain(Either_1.fold(f, function (a) { return A.of(a); })); },
        swap: M.map(Either_1.swap),
        rightM: M.map(Either_1.right),
        leftM: M.map(Either_1.left),
        left: function (e) { return M.of(Either_1.left(e)); }
    };
}
exports.getEitherM = getEitherM;

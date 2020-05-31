"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationM = void 0;
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
var function_1 = require("./function");
function getValidationM(S, M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.getValidation(S));
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        alt: function (that) {
            return M.chain(function (e1) {
                return Either_1.isRight(e1)
                    ? A.of(e1.right)
                    : function_1.pipe(that(), M.map(function (e2) { return (Either_1.isLeft(e2) ? Either_1.left(S.concat(e1.left, e2.left)) : e2); }));
            });
        }
    };
}
exports.getValidationM = getValidationM;

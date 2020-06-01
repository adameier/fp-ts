"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alt = void 0;
/**
 * @since 2.0.0
 */
var Either_1 = require("./Either");
var function_1 = require("./function");
function alt(S, M) {
    return function (that) {
        return M.chain(function (e1) {
            return Either_1.isRight(e1)
                ? M.of(Either_1.right(e1.right))
                : function_1.pipe(that(), M.map(function (e2) { return (Either_1.isLeft(e2) ? Either_1.left(S.concat(e1.left, e2.left)) : e2); }));
        });
    };
}
exports.alt = alt;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceS = exports.sequenceT = void 0;
var function_1 = require("./function");
function curried(f, n, acc) {
    return function (x) {
        var combined = acc.concat([x]);
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = function_1.pipe(args[0], F.map(f));
        for (var i = 1; i < len; i++) {
            fas = function_1.pipe(fas, F.ap(args[i]));
        }
        return fas;
    };
}
exports.sequenceT = sequenceT;
function getRecordConstructor(keys) {
    var len = keys.length;
    return curried(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var r = {};
        for (var i = 0; i < len; i++) {
            r[keys[i]] = args[i];
        }
        return r;
    }, len - 1, []);
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = function_1.pipe(r[keys[0]], F.map(f));
        for (var i = 1; i < len; i++) {
            fr = function_1.pipe(fr, F.ap(r[keys[i]]));
        }
        return fr;
    };
}
exports.sequenceS = sequenceS;
/* tslint:enable:readonly-array */

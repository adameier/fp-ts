"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordDate = exports.eqGetFullYear = exports.eqGetMonth = exports.eqGetDate = exports.eqDate = exports.now = exports.create = void 0;
var Eq_1 = require("./Eq");
var Ord_1 = require("./Ord");
/**
 * Returns the current `Date`
 *
 * @since 2.0.0
 */
exports.create = function () { return new Date(); };
/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
exports.now = function () { return new Date().getTime(); };
/**
 * @since 3.0.0
 */
exports.eqDate = 
/*#__PURE__*/
Eq_1.fromEquals(function (x, y) { return x.valueOf() === y.valueOf(); });
/**
 * @since 3.0.0
 */
exports.eqGetDate = 
/*#__PURE__*/
Eq_1.fromEquals(function (x, y) { return x.getDate() === y.getDate(); });
/**
 * @since 3.0.0
 */
exports.eqGetMonth = 
/*#__PURE__*/
Eq_1.fromEquals(function (x, y) { return x.getMonth() === y.getMonth(); });
/**
 * @since 3.0.0
 */
exports.eqGetFullYear = 
/*#__PURE__*/
Eq_1.fromEquals(function (x, y) { return x.getFullYear() === y.getFullYear(); });
/**
 * @since 3.0.0
 */
exports.ordDate = 
/*#__PURE__*/
Ord_1.fromCompare(function (x, y) { return Ord_1.ordNumber.compare(x.valueOf(), y.valueOf()); });

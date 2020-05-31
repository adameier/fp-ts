import { fromEquals } from './Eq';
import { fromCompare, ordNumber } from './Ord';
/**
 * Returns the current `Date`
 *
 * @since 2.0.0
 */
export var create = function () { return new Date(); };
/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
export var now = function () { return new Date().getTime(); };
/**
 * @since 3.0.0
 */
export var eqDate = 
/*#__PURE__*/
fromEquals(function (x, y) { return x.valueOf() === y.valueOf(); });
/**
 * @since 3.0.0
 */
export var eqGetDate = 
/*#__PURE__*/
fromEquals(function (x, y) { return x.getDate() === y.getDate(); });
/**
 * @since 3.0.0
 */
export var eqGetMonth = 
/*#__PURE__*/
fromEquals(function (x, y) { return x.getMonth() === y.getMonth(); });
/**
 * @since 3.0.0
 */
export var eqGetFullYear = 
/*#__PURE__*/
fromEquals(function (x, y) { return x.getFullYear() === y.getFullYear(); });
/**
 * @since 3.0.0
 */
export var ordDate = 
/*#__PURE__*/
fromCompare(function (x, y) { return ordNumber.compare(x.valueOf(), y.valueOf()); });

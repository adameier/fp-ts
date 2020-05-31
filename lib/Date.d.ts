/**
 * @since 2.0.0
 */
import { IO } from './IO'
import { Eq } from './Eq'
import { Ord } from './Ord'
/**
 * Returns the current `Date`
 *
 * @since 2.0.0
 */
export declare const create: IO<Date>
/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
export declare const now: IO<number>
/**
 * @since 3.0.0
 */
export declare const eqDate: Eq<Date>
/**
 * @since 3.0.0
 */
export declare const eqGetDate: Eq<Date>
/**
 * @since 3.0.0
 */
export declare const eqGetMonth: Eq<Date>
/**
 * @since 3.0.0
 */
export declare const eqGetFullYear: Eq<Date>
/**
 * @since 3.0.0
 */
export declare const ordDate: Ord<Date>

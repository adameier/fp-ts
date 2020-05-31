/**
 * @since 2.0.0
 */
import { Eq } from './Eq'
import { Monoid } from './Monoid'
/**
 * @since 2.0.0
 */
export declare type Ordering = -1 | 0 | 1
/**
 * @since 2.0.0
 */
export declare function sign(n: number): Ordering
/**
 * @since 2.0.0
 */
export declare const eqOrdering: Eq<Ordering>
/**
 * @since 2.4.0
 */
export declare const monoidOrdering: Monoid<Ordering>
/**
 * @since 2.0.0
 */
export declare function invert(O: Ordering): Ordering

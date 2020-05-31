/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative1 } from './Applicative'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Functor1 } from './Functor'
import { Apply1 } from './Apply'
import { Extend1 } from './Extend'
/**
 * @since 2.0.0
 */
export declare const URI = 'Identity'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Identity<A>
  }
}
/**
 * @since 2.0.0
 */
export declare type Identity<A> = A
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Identity<A>>
/**
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<Identity<A>>
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B>
/**
 * @since 3.0.0
 */
export declare const functorIdentity: Functor1<URI>
/**
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B>
/**
 * @since 3.0.0
 */
export declare const applyIdentity: Apply1<URI>
/**
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Identity<B>) => <A>(fa: Identity<A>) => Identity<A>
/**
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: B) => <A>(fa: A) => B
/**
 * @since 3.0.0
 */
export declare const of: <A>(a: A) => Identity<A>
/**
 * @since 3.0.0
 */
export declare const applicativeIdentity: Applicative1<URI>
/**
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<B>
/**
 * @since 3.0.0
 */
export declare const monadIdentity: Monad1<URI>
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<A>
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A>
/**
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Identity<A>) => B
/**
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Identity<A>) => M
/**
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Identity<A>) => B
/**
 * @since 3.0.0
 */
export declare const foldableIdentity: Foldable1<URI>
/**
 * @since 2.0.0
 */
export declare const alt: <A>(that: () => Identity<A>) => (fa: Identity<A>) => Identity<A>
/**
 * @since 3.0.0
 */
export declare const altIdentity: Alt1<URI>
/**
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => Identity<B>
/**
 * @since 3.0.0
 */
export declare const extendIdentity: Extend1<URI>
/**
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>>
/**
 * @since 2.6.2
 */
export declare const extract: <A>(wa: Identity<A>) => A
/**
 * @since 3.0.0
 */
export declare const comonadIdentity: Comonad1<URI>
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable1<URI>['traverse']
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable1<URI>['sequence']
/**
 * @since 3.0.0
 */
export declare const traversableIdentity: Traversable1<URI>

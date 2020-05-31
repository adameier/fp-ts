/**
 * @since 2.5.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'
import { Extend2 } from './Extend'
/**
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyTuple'
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: readonly [A, E]
  }
}
/**
 * @since 2.5.0
 */
export declare function fst<A, S>(sa: readonly [A, S]): A
/**
 * @since 2.5.0
 */
export declare function snd<A, S>(sa: readonly [A, S]): S
/**
 * @since 2.5.0
 */
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
/**
 * @since 2.5.0
 */
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
/**
 * @since 2.5.0
 */
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
/**
 * @since 2.5.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: readonly [A, E]) => readonly [B, G]
/**
 * @since 3.0.0
 */
export declare const pipe: <B, C>(fbc: readonly [C, B]) => <A>(fab: readonly [B, A]) => readonly [C, A]
/**
 * @since 2.5.0
 */
export declare const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
/**
 * @since 2.5.0
 */
export declare const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E]
/**
 * @since 2.6.2
 */
export declare const extract: <E, A>(wa: readonly [A, E]) => A
/**
 * @since 2.5.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
/**
 * @since 2.5.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
/**
 * @since 2.5.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: readonly [A, E]) => readonly [A, G]
/**
 * @since 2.5.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
/**
 * @since 2.5.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
/**
 * @since 3.0.0
 */
export declare const traverse: Traversable2<URI>['traverse']
/**
 * @since 3.0.0
 */
export declare const sequence: Traversable2<URI>['sequence']
/**
 * @since 3.0.0
 */
export declare const semigroupoidReadonlyTuple: Semigroupoid2<URI>
/**
 * @since 3.0.0
 */
export declare const bifunctorReadonlyTuple: Bifunctor2<URI>
/**
 * @since 3.0.0
 */
export declare const extendReadonlyTuple: Extend2<URI>
/**
 * @since 3.0.0
 */
export declare const comonadReadonlyTuple: Comonad2<URI>
/**
 * @since 3.0.0
 */
export declare const foldableReadonlyTuple: Foldable2<URI>
/**
 * @since 3.0.0
 */
export declare const traversableReadonlyTuple: Traversable2<URI>

/**
 * @since 2.0.0
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
 * @since 2.0.0
 */
export declare const URI = 'Tuple'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: [A, E]
  }
}
/**
 * @since 2.0.0
 */
export declare const fst: <A, S>(sa: [A, S]) => A
/**
 * @since 2.0.0
 */
export declare const snd: <A, S>(sa: [A, S]) => S
/**
 * @since 2.0.0
 */
export declare const swap: <A, S>(sa: [A, S]) => [S, A]
/**
 * @since 2.0.0
 */
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S>
/**
 * @since 2.0.0
 */
export declare const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S>
/**
 * @since 2.0.0
 */
export declare const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S>
/**
 * @since 2.0.0
 */
export declare const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S>
/**
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
/**
 * @since 3.0.0
 */
export declare const pipe: <B, C>(fbc: [C, B]) => <A>(fab: [B, A]) => [C, A]
/**
 * @since 2.0.0
 */
export declare const duplicate: <E, A>(ma: [A, E]) => [[A, E], E]
/**
 * @since 2.0.0
 */
export declare const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E]
/**
 * @since 2.6.2
 */
export declare const extract: <E, A>(wa: [A, E]) => A
/**
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
/**
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
/**
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
/**
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
/**
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
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
export declare const semigroupoidTuple: Semigroupoid2<URI>
/**
 * @since 3.0.0
 */
export declare const bifunctorTuple: Bifunctor2<URI>
/**
 * @since 3.0.0
 */
export declare const extendTuple: Extend2<URI>
/**
 * @since 3.0.0
 */
export declare const comonadTuple: Comonad2<URI>
/**
 * @since 3.0.0
 */
export declare const foldableTuple: Foldable2<URI>
/**
 * @since 3.0.0
 */
export declare const traversableTuple: Traversable2<URI>

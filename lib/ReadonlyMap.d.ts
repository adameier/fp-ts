import { Compactable2 } from './Compactable';
import { Eq } from './Eq';
import { Filterable2 } from './Filterable';
import { FilterableWithIndex2C } from './FilterableWithIndex';
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable';
import { FoldableWithIndex2C } from './FoldableWithIndex';
import { Functor2 } from './Functor';
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT';
import { Magma } from './Magma';
import { Monoid } from './Monoid';
import * as O from './Option';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Show } from './Show';
import { TraversableWithIndex2C } from './TraversableWithIndex';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Witherable2C } from './Witherable';
import { FunctorWithIndex2C } from './FunctorWithIndex';
/**
 * @since 2.5.0
 */
export declare const URI = "ReadonlyMap";
/**
 * @since 2.5.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind2<E, A> {
        readonly [URI]: ReadonlyMap<E, A>;
    }
}
/**
 * @since 2.5.0
 */
export declare function fromMap<K, A>(m: Map<K, A>): ReadonlyMap<K, A>;
/**
 * @since 2.5.0
 */
export declare function toMap<K, A>(m: ReadonlyMap<K, A>): Map<K, A>;
/**
 * @since 2.5.0
 */
export declare function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>>;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
export declare function size<K, A>(d: ReadonlyMap<K, A>): number;
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
export declare function isEmpty<K, A>(d: ReadonlyMap<K, A>): boolean;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
export declare function member<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => boolean;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
export declare function elem<A>(E: Eq<A>): <K>(a: A, m: ReadonlyMap<K, A>) => boolean;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
export declare function keys<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<K>;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
export declare function values<A>(O: Ord<A>): <K>(m: ReadonlyMap<K, A>) => ReadonlyArray<A>;
/**
 * @since 2.5.0
 */
export declare function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B>;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.5.0
 */
export declare function toReadonlyArray<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]>;
/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 2.5.0
 */
export declare function toUnfoldable<K, F extends URIS>(ord: Ord<K>, U: Unfoldable1<F>): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>;
export declare function toUnfoldable<K, F>(ord: Ord<K>, U: Unfoldable<F>): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.5.0
 */
export declare function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>;
/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
export declare function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>;
/**
 * @since 2.5.0
 */
export declare function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>;
/**
 * @since 2.5.0
 */
export declare function modifyAt<K>(E: Eq<K>): <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export declare function pop<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => O.Option<readonly [A, ReadonlyMap<K, A>]>;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
export declare function lookupWithKey<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => O.Option<readonly [K, A]>;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
export declare function lookup<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => O.Option<A>;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.5.0
 */
export declare function isSubmap<K, A>(SK: Eq<K>, SA: Eq<A>): (d1: ReadonlyMap<K, A>, d2: ReadonlyMap<K, A>) => boolean;
/**
 * @since 2.5.0
 */
export declare const empty: ReadonlyMap<never, never>;
/**
 * @since 2.5.0
 */
export declare function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>>;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.5.0
 */
export declare function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>>;
/**
 * Create a map with one key/value pair
 *
 * @since 2.5.0
 */
export declare function singleton<K, A>(k: K, a: A): ReadonlyMap<K, A>;
/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.5.0
 */
export declare function fromFoldable<F extends URIS3, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable3<F>): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>;
export declare function fromFoldable<F extends URIS2, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable2<F>): <E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyMap<K, A>;
export declare function fromFoldable<F extends URIS, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable1<F>): (fka: Kind<F, readonly [K, A]>) => ReadonlyMap<K, A>;
export declare function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A>;
/**
 * @since 2.5.0
 */
export declare const map: Functor2<URI>['map'];
/**
 * @since 3.0.0
 */
export declare const functorReadonlyMap: Functor2<URI>;
/**
 * @since 3.0.0
 */
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>;
/**
 * @since 3.0.0
 */
export declare function getFunctorWithIndex<K = never>(): FunctorWithIndex2C<URI, K, K>;
/**
 * @since 2.5.0
 */
export declare const compact: Compactable2<URI>['compact'];
/**
 * @since 2.5.0
 */
export declare const separate: Compactable2<URI>['separate'];
/**
 * @since 3.0.0
 */
export declare const compactableReadonlyMap: Compactable2<URI>;
/**
 * @since 2.5.0
 */
export declare const filter: Filterable2<URI>['filter'];
/**
 * @since 2.5.0
 */
export declare const filterMap: Filterable2<URI>['filterMap'];
/**
 * @since 2.5.0
 */
export declare const partition: Filterable2<URI>['partition'];
/**
 * @since 2.5.0
 */
export declare const partitionMap: Filterable2<URI>['partitionMap'];
/**
 * @since 2.5.0
 */
export declare const filterableReadonlyMap: Filterable2<URI>;
/**
 * @since 3.0.0
 */
export declare function getFoldableWithIndex<K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K>;
/**
 * @since 2.5.0
 */
export declare function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K>;
/**
 * @since 2.5.0
 */
export declare function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K>;

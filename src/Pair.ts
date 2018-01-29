import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT2, HKT3, HKT3As, HKT3S } from './HKT'
import { Endomorphism } from './function'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { semigroupOrdering } from './Ordering'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { liftA2 } from './Apply'
import { Comonad } from './Comonad'

// Adapted from https://github.com/parsonsmatt/purescript-pair

declare module './HKT' {
  interface URI2HKT<A> {
    Pair: Pair<A>
  }
}

export const URI = 'Pair'

export type URI = typeof URI

/**
 * @data
 * @constructor Pair
 */
export class Pair<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly value: [A, A]) {}
  fst(): A {
    return this.value[0]
  }
  snd(): A {
    return this.value[1]
  }
  /** Map a function over the first field of a pair */
  first(f: Endomorphism<A>): Pair<A> {
    return new Pair([f(this.fst()), this.snd()])
  }
  /** Map a function over the second field of a pair */
  second(f: Endomorphism<A>): Pair<A> {
    return new Pair([this.fst(), f(this.snd())])
  }
  /** Swaps the elements in a pair */
  swap(): Pair<A> {
    return new Pair([this.snd(), this.fst()])
  }
  map<B>(f: (a: A) => B): Pair<B> {
    return new Pair([f(this.fst()), f(this.snd())])
  }
  ap<B>(fab: Pair<(a: A) => B>): Pair<B> {
    return new Pair([fab.fst()(this.fst()), fab.snd()(this.snd())])
  }
  ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> {
    return fb.ap(this)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(f(b, this.fst()), this.snd())
  }
  traverse<F extends HKT3S>(F: Applicative<F>): <U, L, B>(f: (a: A) => HKT3<F, U, L, B>) => HKT3As<F, U, L, Pair<B>>
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2<F, L, B>) => HKT2As<F, L, Pair<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> {
    return <B>(f: (a: A) => HKT<F, B>) =>
      liftA2(F)((b1: B) => (b2: B) => new Pair([b1, b2]))(f(this.fst()))(f(this.snd()))
  }
  extract(): A {
    return this.fst()
  }
  extend<B>(f: (fb: Pair<A>) => B): Pair<B> {
    return new Pair([f(this), f(this.swap())])
  }
}

const map = <A, B>(fa: Pair<A>, f: (a: A) => B): Pair<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): Pair<A> => {
  return new Pair([a, a])
}

const ap = <A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B> => {
  return fa.ap(fab)
}

const reduce = <A, B>(fa: Pair<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const extract = <A>(fa: Pair<A>): A => {
  return fa.extract()
}

const extend = <A, B>(f: (fb: Pair<A>) => B, fa: Pair<A>): Pair<B> => {
  return fa.extend(f)
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => {
  return {
    equals: (x, y) => S.equals(x.fst(), y.fst()) && S.equals(x.snd(), y.snd())
  }
}

/** @function */
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => {
  return {
    ...getSetoid(O),
    compare: (x, y) => semigroupOrdering.concat(O.compare(x.fst(), y.fst()), O.compare(x.snd(), y.snd()))
  }
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => {
  return {
    concat: (x, y) => new Pair([S.concat(x.fst(), y.fst()), S.concat(x.snd(), y.snd())])
  }
}

/** @function */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => {
  return {
    ...getSemigroup(M),
    empty: new Pair([M.empty, M.empty])
  }
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<URI, A>, f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>>
function traverse<F>(F: Applicative<F>): <A, B>(ta: Pair<A>, f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> {
  return (ta, f) => ta.traverse(F)(f)
}

/** @instance */
export const pair: Applicative<URI> & Foldable<URI> & Traversable<URI> & Comonad<URI> = {
  URI,
  map,
  of,
  ap,
  reduce,
  traverse,
  extend,
  extract
}

/**
 * @since 2.0.0
 */
import { Either } from './Either';
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT';
import { Monad, Monad1, Monad2 } from './Monad';
import { Semigroup } from './Semigroup';
/**
 * @since 2.0.0
 */
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {
}
/**
 * @since 3.0.0
 */
export interface ValidationM<M, E> {
    readonly alt: <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>;
}
/**
 * @since 2.0.0
 */
export declare type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>;
/**
 * @since 2.0.0
 */
export declare type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>;
/**
 * @since 3.0.0
 */
export declare function alt<E, M extends URIS2>(S: Semigroup<E>, M: Monad2<M>): <R, A>(that: () => ValidationT2<M, R, E, A>) => (fa: ValidationT2<M, R, E, A>) => ValidationT2<M, R, E, A>;
export declare function alt<E, M extends URIS>(S: Semigroup<E>, M: Monad1<M>): <A>(that: () => ValidationT1<M, E, A>) => (fa: ValidationT1<M, E, A>) => ValidationT1<M, E, A>;
export declare function alt<E, M>(S: Semigroup<E>, M: Monad<M>): <A>(that: () => ValidationT<M, E, A>) => (fa: ValidationT<M, E, A>) => ValidationT<M, E, A>;

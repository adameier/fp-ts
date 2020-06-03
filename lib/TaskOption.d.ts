/**
 * @since 3.0.0
 */
import { Alt1 } from './Alt';
import { Alternative1 } from './Alternative';
import { Applicative1 } from './Applicative';
import { Apply1 } from './Apply';
import { Compactable1 } from './Compactable';
import { Filterable1 } from './Filterable';
import { Lazy } from './function';
import { Functor1 } from './Functor';
import { Monad1 } from './Monad';
import * as O from './Option';
import * as T from './Task';
import { TaskEither } from './TaskEither';
import Option = O.Option;
import Task = T.Task;
/**
 * @since 3.0.0
 */
export declare const URI = "TaskOption";
/**
 * @since 3.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 3.0.0
 */
export interface TaskOption<A> extends Task<Option<A>> {
}
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: TaskOption<A>;
    }
}
/**
 * @since 3.0.0
 */
export declare const none: TaskOption<never>;
/**
 * @since 3.0.0
 */
export declare const some: <A>(a: A) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const fromTask: <A>(as: Task<A>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const fromOption: <A>(ma: Option<A>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>;
/**
 * @since 3.0.0
 */
export declare const fromTaskEither: <A>(ma: TaskEither<any, A>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const fold: <A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (as: TaskOption<A>) => Task<B>;
/**
 * @since 3.0.0
 */
export declare const getOrElse: <A>(onNone: () => Task<A>) => (as: TaskOption<A>) => Task<A>;
/**
 * @since 3.0.0
 */
export declare const toUndefined: <A>(ma: TaskOption<A>) => Task<A | undefined>;
/**
 * @since 3.0.0
 */
export declare const toNullable: <A>(ma: TaskOption<A>) => Task<A | null>;
/**
 * @since 3.0.0
 */
export declare function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare function fromOptionK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const functorTaskOption: Functor1<URI>;
/**
 * @since 3.0.0
 */
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const applyTaskOption: Apply1<URI>;
/**
 * @since 3.0.0
 */
export declare const apFirst: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const apSecond: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const of: <A>(a: A) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const applicativeTaskOption: Applicative1<URI>;
/**
 * @since 3.0.0
 */
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const monadTaskOption: Monad1<URI>;
/**
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A>;
/**
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const chainTaskK: <A, B>(f: (a: A) => Task<B>) => (ma: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: TaskOption<A>) => TaskOption<B>;
/**
 * @since 3.0.0
 */
export declare const alt: <A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A>;
/**
 * @since 3.0.0
 */
export declare const altTaskOption: Alt1<URI>;
/**
 * @since 3.0.0
 */
export declare const zero: Alternative1<URI>['zero'];
/**
 * @since 3.0.0
 */
export declare const alternativeTaskOption: Alternative1<URI>;
/**
 * @since 3.0.0
 */
export declare const compact: Compactable1<URI>['compact'];
/**
 * @since 3.0.0
 */
export declare const separate: Compactable1<URI>['separate'];
/**
 * @since 3.0.0
 */
export declare const compactableTaskOption: Compactable1<URI>;
/**
 * @since 3.0.0
 */
export declare const filter: Filterable1<URI>['filter'];
/**
 * @since 3.0.0
 */
export declare const filterMap: Filterable1<URI>['filterMap'];
/**
 * @since 3.0.0
 */
export declare const partition: Filterable1<URI>['partition'];
/**
 * @since 3.0.0
 */
export declare const partitionMap: Filterable1<URI>['partitionMap'];
/**
 * @since 3.0.0
 */
export declare const filterableTaskOption: Filterable1<URI>;

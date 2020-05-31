import { identity, pipe } from './function';
/**
 * @since 2.0.0
 */
export var URI = 'Store';
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export function seek(s) {
    return function (wa) { return ({ peek: wa.peek, pos: s }); };
}
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export function seeks(f) {
    return function (wa) { return ({ peek: wa.peek, pos: f(wa.pos) }); };
}
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export function peeks(f) {
    return function (wa) { return wa.peek(f(wa.pos)); };
}
export function experiment(F) {
    return function (f) { return function (wa) {
        return pipe(f(wa.pos), F.map(function (s) { return wa.peek(s); }));
    }; };
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.6.2
 */
export var extract = function (wa) { return wa.peek(wa.pos); };
/**
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) { return ({
    peek: function (s) { return f({ peek: wa.peek, pos: s }); },
    pos: wa.pos
}); }; };
/**
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
extend(identity);
/**
 * @since 2.0.0
 */
export var map = function (f) { return function (wa) { return ({
    peek: function (s) { return f(wa.peek(s)); },
    pos: wa.pos
}); }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
export var functorStore = {
    URI: URI,
    map: map
};
/**
 * @since 3.0.0
 */
export var extendStore = {
    URI: URI,
    map: map,
    extend: extend
};
/**
 * @since 3.0.0
 */
export var comonadStore = {
    URI: URI,
    map: map,
    extend: extend,
    extract: extract
};

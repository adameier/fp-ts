"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comonadStore = exports.extendStore = exports.functorStore = exports.map = exports.duplicate = exports.extend = exports.extract = exports.experiment = exports.peeks = exports.seeks = exports.seek = exports.URI = void 0;
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Store';
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
function seek(s) {
    return function (wa) { return ({ peek: wa.peek, pos: s }); };
}
exports.seek = seek;
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
function seeks(f) {
    return function (wa) { return ({ peek: wa.peek, pos: f(wa.pos) }); };
}
exports.seeks = seeks;
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
function peeks(f) {
    return function (wa) { return wa.peek(f(wa.pos)); };
}
exports.peeks = peeks;
function experiment(F) {
    return function (f) { return function (wa) {
        return function_1.pipe(f(wa.pos), F.map(function (s) { return wa.peek(s); }));
    }; };
}
exports.experiment = experiment;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.6.2
 */
exports.extract = function (wa) { return wa.peek(wa.pos); };
/**
 * @since 2.0.0
 */
exports.extend = function (f) { return function (wa) { return ({
    peek: function (s) { return f({ peek: wa.peek, pos: s }); },
    pos: wa.pos
}); }; };
/**
 * @since 2.0.0
 */
exports.duplicate = exports.extend(function_1.identity);
/**
 * @since 2.0.0
 */
exports.map = function (f) { return function (wa) { return ({
    peek: function (s) { return f(wa.peek(s)); },
    pos: wa.pos
}); }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorStore = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.extendStore = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend
};
/**
 * @since 3.0.0
 */
exports.comonadStore = {
    URI: exports.URI,
    map: exports.map,
    extend: exports.extend,
    extract: exports.extract
};

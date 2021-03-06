"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_array = exports.is_variable = exports.is_string = exports.is_point = exports.is_punctuation = exports.is_digital = void 0;
var is_digital = function (token) { return /[0-9]/.test(token); };
exports.is_digital = is_digital;
var is_punctuation = function (token) { return /[-+*\/\%=\(\)]/.test(token); };
exports.is_punctuation = is_punctuation;
var is_point = function (token) { return /[\.]/.test(token); };
exports.is_point = is_point;
var is_string = function (token) { return token === '"' || token === "'" || token === '`'; };
exports.is_string = is_string;
var is_variable = function (token) { return /[a-zA-Z]/.test(token); };
exports.is_variable = is_variable;
var is_array = function (token) { return /[\[]/.test(token); };
exports.is_array = is_array;

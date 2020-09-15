"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = void 0;
var env_1 = require("./env");
var add = function (num1, num2) { return { type: 'result', value: num1.value + num2.value }; };
var mul = function (num1, num2) { return { type: 'result', value: num1.value * num2.value }; };
var sub = function (num1, num2) { return { type: 'result', value: num1.value - num2.value }; };
var div = function (num1, num2) { return { type: 'result', value: num1.value / num2.value }; };
var mod = function (num1, num2) { return { type: 'result', value: num1.value % num2.value }; };
var assi = function (num1, num2) { return env_1.variable[num1.value] = num2; };
var func = {
    '+': add,
    '*': mul,
    '-': sub,
    '/': div,
    '%': mod,
    '=': assi,
};
exports.func = func;

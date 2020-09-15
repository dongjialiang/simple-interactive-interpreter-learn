"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variable = exports.operatorStack = exports.dataStack = void 0;
var dataStack = [];
exports.dataStack = dataStack;
var operatorStack = [];
exports.operatorStack = operatorStack;
var variable = new Set();
exports.variable = variable;

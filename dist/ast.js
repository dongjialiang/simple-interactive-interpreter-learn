"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ast = void 0;
var env_1 = require("./env");
var operators = {
    '+': 13,
    '-': 13,
    '*': 14,
    '/': 14,
    '%': 14,
    '=': 10,
    '(': 20,
    ')': 20,
};
var ast = function (token) {
    var tokens = token.slice();
    var next = null;
    while (true) {
        if (tokens.length) {
            next = tokens.pop();
            if (next.type === 'punc') {
                if (!env_1.operatorStack.length) {
                    env_1.operatorStack.push(next);
                }
                else if (env_1.operatorStack[env_1.operatorStack.length - 1].type === 'punc'
                    && env_1.operatorStack[env_1.operatorStack.length - 1].value === ')') {
                    env_1.operatorStack.push(next);
                }
                else if (next.value === '(') {
                    next = env_1.operatorStack.pop();
                    while (next.value !== ')') {
                        env_1.dataStack.push([next, env_1.dataStack.pop(), env_1.dataStack.pop()]);
                        next = env_1.operatorStack.pop();
                    }
                }
                else if ((next.type === 'punc'
                    && env_1.operatorStack[env_1.operatorStack.length - 1].type === 'punc')
                    && operators[env_1.operatorStack[env_1.operatorStack.length - 1].value] === operators[next.value]) {
                    env_1.operatorStack.push(next);
                }
                else if (next.type === 'punc' && (operators[env_1.operatorStack[env_1.operatorStack.length - 1].value] < operators[next.value])) {
                    env_1.operatorStack.push(next);
                }
                else {
                    while (env_1.operatorStack.length
                        && (next.type === 'punc'
                            && env_1.operatorStack[env_1.operatorStack.length - 1].type === 'punc')
                        && (operators[env_1.operatorStack[env_1.operatorStack.length - 1].value] > operators[next.value]
                            && operators[env_1.operatorStack[env_1.operatorStack.length - 1].value] < 20)) {
                        env_1.dataStack.push([env_1.operatorStack.pop(), env_1.dataStack.pop(), env_1.dataStack.pop()]);
                    }
                    env_1.operatorStack.push(next);
                }
            }
            else {
                env_1.dataStack.push(next);
            }
        }
        else if (env_1.operatorStack.length) {
            next = env_1.operatorStack.pop();
            if (next.type === 'punc' && (operators[next.value] !== 20)) {
                env_1.dataStack.push([next, env_1.dataStack.pop(), env_1.dataStack.pop()]);
            }
        }
        else {
            break;
        }
    }
    return env_1.dataStack;
};
exports.ast = ast;

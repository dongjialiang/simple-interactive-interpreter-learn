#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("./tokenizer");
var ast_1 = require("./ast");
var func_1 = require("./func");
var env_1 = require("./env");
var chalk_1 = require("chalk");
var exe = function (data) {
    if (data instanceof Array) {
        if (data[1] instanceof Array) {
            data[1] = exe(data[1]);
        }
        if (data[2] instanceof Array) {
            data[2] = exe(data[2]);
        }
        if (data[1].type === 'var' && data[2].type === 'var') {
            if (data[0].type === 'punc' && data[0].value === '=') {
                return func_1.func[data[0].value](data[1], env_1.variable[data[2].value]);
            }
            return func_1.func[data[0].value](env_1.variable[data[1].value], env_1.variable[data[2].value]);
        }
        else if (data[1].type === 'var') {
            if (data[0].type === 'punc' && data[0].value !== '=') {
                return func_1.func[data[0].value](env_1.variable[data[1].value], data[2]);
            }
            return func_1.func[data[0].value](data[1], data[2]);
        }
        else if (data[2].type === 'var') {
            if (data[0].type === 'punc' && data[0].value !== '=') {
                return func_1.func[data[0].value](data[1], env_1.variable[data[2].value]);
            }
            return func_1.func[data[0].value](data[1], data[2]);
        }
        return func_1.func[data[0].value](data[1], data[2]);
    }
    else if (data.type === 'var') {
        var varia = env_1.variable[data.value] === undefined
            ? env_1.variable[data.value]
            : env_1.variable[data.value].value;
        return { type: 'result', value: varia };
    }
    else if (data.type === 'index') {
        if (env_1.variable[data.value] === undefined) {
            throw "ReferenceError: " + data.value + " is not defined";
        }
        return { type: 'result', value: (env_1.variable[data.value].value)[data.index] };
    }
    else {
        return { type: 'result', value: data.value };
    }
};
var execute = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, tokenizer_1.tokenizer_iterator(input)];
            case 1:
                token = _a.sent();
                ast_1.ast(token);
                process.stdout.write(chalk_1.red(exe(env_1.dataStack.pop()).value) + "\n");
                return [2];
        }
    });
}); };
var read_line_input = process.stdin;
read_line_input.setEncoding('utf-8');
process.stdout.write('Hello baby.\n');
process.stdout.write('> ');
read_line_input.on('data', function (line) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (line.toString().replace(/[\r\n]+/, '') === '.exit') {
                    process.stdout.write('good bye');
                    process.exit();
                }
                return [4, execute(line)];
            case 1:
                _a.sent();
                process.stdout.write('> ');
                return [2];
        }
    });
}); });

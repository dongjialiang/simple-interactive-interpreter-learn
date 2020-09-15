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
exports.tokenizer_iterator = exports.tokenizer = void 0;
var env_1 = require("./env");
var type_detection_1 = require("./type-detection");
var tokenizer = function (input) {
    return input.split(/\s*(=|[-+*\/\%=\(\)]|[0-9]*\.?[0-9]+)\s*/).filter(function (d) { return !d.match(/^\s*$/); });
};
exports.tokenizer = tokenizer;
var tokenizer_iterator = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var asnycIterator, token, next, col, _a, point_lock, num, end, string, start, varia, index, start_1, array;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                asnycIterator = input[Symbol.iterator]();
                token = [];
                return [4, asnycIterator.next()];
            case 1:
                next = _b.sent();
                col = 0;
                _b.label = 2;
            case 2:
                if (!!next.done) return [3, 47];
                _a = true;
                switch (_a) {
                    case type_detection_1.is_digital(next.value): return [3, 3];
                    case type_detection_1.is_punctuation(next.value): return [3, 13];
                    case type_detection_1.is_string(next.value): return [3, 15];
                    case type_detection_1.is_variable(next.value): return [3, 26];
                    case type_detection_1.is_array(next.value): return [3, 37];
                }
                return [3, 44];
            case 3:
                point_lock = false;
                num = next.value;
                return [4, asnycIterator.next()];
            case 4:
                next = _b.sent();
                col++;
                _b.label = 5;
            case 5:
                if (!(type_detection_1.is_digital(next.value) || type_detection_1.is_point(next.value))) return [3, 12];
                if (!type_detection_1.is_point(next.value)) return [3, 10];
                if (!point_lock) return [3, 9];
                _b.label = 6;
            case 6:
                if (!type_detection_1.is_point(next.value)) return [3, 8];
                return [4, asnycIterator.next()];
            case 7:
                next = _b.sent();
                col++;
                return [3, 6];
            case 8:
                while (--col) {
                    input += ' ';
                }
                throw input + "^\n SyntaxError: Unexpected number";
            case 9:
                point_lock = true;
                _b.label = 10;
            case 10:
                num += next.value;
                return [4, asnycIterator.next()];
            case 11:
                next = _b.sent();
                col++;
                return [3, 5];
            case 12:
                point_lock = false;
                token.push({ type: 'number', value: Number.parseFloat(num) });
                return [3, 46];
            case 13:
                token.push({ type: 'punc', value: next.value });
                return [4, asnycIterator.next()];
            case 14:
                next = _b.sent();
                col++;
                return [3, 46];
            case 15:
                end = next.value;
                return [4, asnycIterator.next()];
            case 16:
                next = _b.sent();
                string = '';
                start = ++col;
                _b.label = 17;
            case 17:
                if (!(next.value !== end)) return [3, 24];
                if (!next.done) return [3, 18];
                col -= start;
                while (--start) {
                    input += ' ';
                }
                while (--col) {
                    input += '^';
                }
                throw input + "\n SyntaxError: Invalid or unexpected token";
            case 18:
                if (!(next.value === '\\')) return [3, 21];
                return [4, asnycIterator.next()];
            case 19:
                next = _b.sent();
                col++;
                string += next.value;
                return [4, asnycIterator.next()];
            case 20:
                next = _b.sent();
                col++;
                return [3, 23];
            case 21:
                string += next.value;
                return [4, asnycIterator.next()];
            case 22:
                next = _b.sent();
                col++;
                _b.label = 23;
            case 23: return [3, 17];
            case 24:
                token.push({ type: 'string', value: string });
                return [4, asnycIterator.next()];
            case 25:
                next = _b.sent();
                col++;
                return [3, 46];
            case 26:
                varia = '';
                _b.label = 27;
            case 27:
                if (!(type_detection_1.is_digital(next.value) || type_detection_1.is_variable(next.value))) return [3, 29];
                varia += next.value;
                return [4, asnycIterator.next()];
            case 28:
                next = _b.sent();
                col++;
                return [3, 27];
            case 29:
                if (!type_detection_1.is_array(next.value)) return [3, 36];
                index = '';
                return [4, asnycIterator.next()];
            case 30:
                next = _b.sent();
                start_1 = ++col;
                _b.label = 31;
            case 31:
                if (!type_detection_1.is_digital(next.value)) return [3, 33];
                index += next.value;
                return [4, asnycIterator.next()];
            case 32:
                next = _b.sent();
                col++;
                return [3, 31];
            case 33:
                if (!(next.value === ']')) return [3, 35];
                return [4, asnycIterator.next()];
            case 34:
                next = _b.sent();
                col++;
                token.push({ type: 'index', value: varia, index: index });
                return [3, 46];
            case 35:
                if (next.done) {
                    col -= start_1;
                    while (--start_1) {
                        input += ' ';
                    }
                    while (--col) {
                        input += '^';
                    }
                    throw input + "\n SyntaxError: Invalid or unexpected token";
                }
                _b.label = 36;
            case 36:
                token.push({ type: 'var', value: varia });
                env_1.variable[varia];
                return [3, 46];
            case 37:
                array = [];
                return [4, asnycIterator.next()];
            case 38:
                next = _b.sent();
                _b.label = 39;
            case 39:
                if (!(next.value !== ']')) return [3, 43];
                if (!(next.value === ',')) return [3, 41];
                return [4, asnycIterator.next()];
            case 40:
                next = _b.sent();
                col++;
                _b.label = 41;
            case 41:
                array.push(next.value);
                return [4, asnycIterator.next()];
            case 42:
                next = _b.sent();
                col++;
                return [3, 39];
            case 43:
                token.push({ type: 'array', value: array });
                return [3, 46];
            case 44: return [4, asnycIterator.next()];
            case 45:
                next = _b.sent();
                col++;
                return [3, 46];
            case 46: return [3, 2];
            case 47: return [2, token];
        }
    });
}); };
exports.tokenizer_iterator = tokenizer_iterator;

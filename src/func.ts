import { variable } from './env';

const add = (num1, num2) => { return { type: 'result', value: num1.value + num2.value } };
const mul = (num1, num2) => { return { type: 'result', value: num1.value * num2.value } };
const sub = (num1, num2) => { return { type: 'result', value: num1.value - num2.value } };
const div = (num1, num2) => { return { type: 'result', value: num1.value / num2.value } };
const mod = (num1, num2) => { return { type: 'result', value: num1.value % num2.value } };
const assi = (num1, num2) => variable[num1.value] = num2;
const func = { // 操作符使用的函数
    '+': add,
    '*': mul,
    '-': sub,
    '/': div,
    '%': mod,
    '=': assi,
};
export { func };

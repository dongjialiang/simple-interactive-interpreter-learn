const add = (num1, num2) => num1 + num2;
const mul = (num1, num2) => num1 * num2;
const dec = (num1, num2) => num1 - num2;
const div = (num1, num2) => num1 / num2;
const mod = (num1, num2) => num1 % num2;
const func = { // 操作符使用的函数
    '+': add,
    '*': mul,
    '-': dec,
    '/': div,
    '%': mod
};
module.exports = { func };

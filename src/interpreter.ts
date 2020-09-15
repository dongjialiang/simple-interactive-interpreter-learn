import { tokenizer_iterator } from './tokenizer';
import { ast } from './ast';
import { func } from './func';
import { dataStack, variable } from './env';
import { red } from 'chalk';

const exe = data => {
    if (data instanceof Array) { // 如果数据为数组
        if (data[1] instanceof Array) { 
            data[1] = exe(data[1]);
        }
        if (data[2] instanceof Array) {
            data[2] = exe(data[2]);
        }
        if(data[1].type === 'var' && data[2].type === 'var') { // 当两个数都是变量
            if (data[0].type === 'punc' && data[0].value === '=') {
                return func[data[0].value](data[1], variable[data[2].value]); // 传递操作符(变量名, 变量值)
            }
            return func[data[0].value](variable[data[1].value], variable[data[2].value]);
        }
        else if(data[1].type === 'var') { // 只有第一个数是变量
            if (data[0].type === 'punc' && data[0].value !== '=') {
                return func[data[0].value](variable[data[1].value], data[2]); // 传递操作符(变量值, 变量名)
            }
            return func[data[0].value](data[1], data[2]);
        }
        else if(data[2].type === 'var') { // 只有第二个数是变量
            if (data[0].type === 'punc' && data[0].value !== '=') {
                return func[data[0].value](data[1], variable[data[2].value]); // 传递操作符(变量名, 变量值)
            }
            return func[data[0].value](data[1], data[2]);
        }
        return func[data[0].value](data[1], data[2]);
    } else if (data.type === 'var') {
        let varia = variable[data.value] === undefined // 判断变量是否存在
            ? variable[data.value]
            : variable[data.value].value
        return { type: 'result', value: varia };
    } else if (data.type === 'index') {
        if (variable[data.value] === undefined) {
            throw `ReferenceError: ${data.value} is not defined`;
        }
        return { type: 'result', value: (variable[data.value].value)[data.index] };
    } else {
        return { type: 'result', value: data.value };
    }
};

const execute = async input => {
    const token = await tokenizer_iterator(input);
    ast(token);
    process.stdout.write(`${red(exe(dataStack.pop()).value)}\n`);
};
/* 读一行输入 */
const read_line_input = process.stdin;
read_line_input.setEncoding('utf-8');
/* 输出开始语句 */
process.stdout.write('Hello baby.\n');
process.stdout.write('> ');
/* 处理输入语句 */
read_line_input.on('data', async line => {
    if (line.toString().replace(/[\r\n]+/, '') === '.exit') { // 匹配退出方法
        process.stdout.write('good bye');
        process.exit();
    }
    await execute(line); // 等待操作完毕
    process.stdout.write('> ');
});

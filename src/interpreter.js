const {
    tokenizer_iterator,
} = require('./tokenizer');
const { ast } = require('./ast');
const { func } = require('./func');
const {
    dataStack,
    variable,
} = require('./env');

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
    } else {
        return { type: 'result', value: data.value };
    }
};
const execute = async input => {
    await tokenizer_iterator(input)
        .then(token => {
            // console.log(token);
            ast(token);
            console.log(exe(dataStack.pop()).value);
        })
        .catch(e => console.log(e));
};

const read_line_input = process.stdin;
read_line_input.setEncoding('utf-8');

process.stdout.write('Hello baby.\n');
process.stdout.write('> ');
read_line_input.on('data', line => {
    // console.log(line);
    if (line.replace(/[\r\n]+/, '') === '.exit') { // 修改退出方法
        process.stdout.write('good bye');
        process.exit();
    } else {
        execute(line).then(() => {
            process.stdout.write('> ');
        });
    }
});

/* const code = '1+1';
execute(code);
execute('1 + 1');
execute('1 + 1 ');
execute('18.69 + 1 ');
execute('18.69 + 2 * (5 * 4 + 1 ) / 21 - 5'); */

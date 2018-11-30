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
        if (data[1] instanceof Object || data[2] instanceof Object) {
            if(data[1].type === 'var' && data[2].type === 'var') { // 当两个数都是变量
                if (data[0] === '=') {
                    return func[data[0]](data[1].value, variable[data[2].value]); // 传递操作符(变量名, 变量值)
                }
                return func[data[0]](variable[data[1].value], variable[data[2].value]);
            }
            else if(data[1].type === 'var') { // 只有第一个数是变量
                if (data[0] !== '=') {
                    return func[data[0]](variable[data[1].value], data[2]); // 传递操作符(变量值, 变量名)
                }
                return func[data[0]](data[1].value, data[2]);
            }
            else if(data[2].type === 'var') { // 只有第二个数是变量
                if (data[0] !== '=') {
                    return func[data[0]](data[1].value, variable[data[2].value]); // 传递操作符(变量名, 变量值)
                }
                return func[data[0]](data[1], data[2].value);
            }
        }
        return func[data[0]](data[1], data[2]);
    } else if (data.type === 'var') {
        return variable[data.value];
    } else {
        return data;
    }
};
const execute = async input => {
    await tokenizer_iterator(input)
        .then(d => {
            // console.log(d);
            ast(d);
            console.log(exe(dataStack.pop()));
        })
        .catch(e => console.log(e));
};

const read_line_input = process.stdin;
read_line_input.setEncoding('utf-8');

process.stdout.write('hello baby\n');
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

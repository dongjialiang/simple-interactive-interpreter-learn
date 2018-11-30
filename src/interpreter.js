const {
    tokenizer_iterator,
} = require('./tokenizer');
const { ast } = require('./ast');
const { func } = require('./func');
const { dataStack } = require('./env');

const exe = data => {
    if (data instanceof Array) { // 如果数据为数组
        if (data[1] instanceof Array) { 
            data[1] = exe(data[1]);
        }
        if (data[2] instanceof Array) {
            data[2] = exe(data[2]);
        }
        return func[data[0]](data[1], data[2]);
    } else {
        return data;
    }
};
const execute = async input => {
    await tokenizer_iterator(input)
        .then(d => {
            ast(d);
            console.log(exe(dataStack.pop()));
        })
        .catch(e => console.log(e));
    // ast(tokenizer(input));
    // console.log(tokenizer(input));
    // console.log(ast(tokenizer(input)));
    // console.log(JSON.stringify(dataStack));
};

const read_line_input = process.stdin;
read_line_input.setEncoding('utf-8');

process.stdout.write('hello baby\n');
process.stdout.write('> ');
read_line_input.on('data', line => {
    // console.log(line);
    if (line.replace(/[\r\n]+/, '') === 'exit') {
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

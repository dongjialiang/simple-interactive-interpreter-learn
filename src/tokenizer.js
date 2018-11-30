const {
    is_digital,
    is_punctuation,
    is_point,
    is_string,
} = require('./type-detection');

const tokenizer = input => { // 切分token
    return input.split(/\s*(=|[-+*\/\%=\(\)]|[0-9]*\.?[0-9]+)\s*/).filter((d) => !d.match(/^\s*$/));
};

const tokenizer_iterator = async input => { // 使用迭代器切分token
    const asnycIterator = input[Symbol.iterator]();
    const token = []; // 存储token
    let next = await asnycIterator.next();
    let col = 0; // 保存列数
    while(!next.done) {
        // console.log(/[0-9]/.test(next.value));
        switch (true) {
            case is_digital(next.value): // 判断数字
                let point_lock = false; // 小数点的锁
                let num = next.value; // 存储数字
                next = await asnycIterator.next();
                col++;
                while (is_digital(next.value) | is_point(next.value)) {
                    if (is_point(next.value)) {
                        if (point_lock) {
                            while (is_point(next.value)) {
                                next = await asnycIterator.next();
                                col++;
                            }
                            while (--col) {
                                input += ' ';
                            }
                            throw `${input}^\n SyntaxError: Unexpected number`;
                        }
                        point_lock = true;
                    }
                    num += next.value;
                    next = await asnycIterator.next();
                    col++;
                }
                point_lock = false;
                token.push(Number.parseFloat(num));
                break;
            case is_punctuation(next.value): // 频道标点
                token.push(next.value);
                next = await asnycIterator.next();
                col++;
                break;
            case is_string(next.value): // 判断字符串
                let end = next.value;
                next = await asnycIterator.next();
                let string = '';
                let start = col; // 字符串开始位置
                col++;
                while (next.value !== end) {
                    if (next.done) {
                        col -= start + 1;
                        while (start--) {
                            input += ' ';
                        }
                        while (--col) {
                            input += '^';
                        }
                        throw `${input}\n SyntaxError: Invalid or unexpected token`;
                    }
                    string += next.value;
                    next = await asnycIterator.next();
                    col++;
                }
                token.push(string);
                next = await asnycIterator.next();
                col++;
                break;
            default:
                next = await asnycIterator.next();
                col++;
                break;
        }
    }
    return token;
};
// tokenizer_iterator('8.9-"90"').then(d => console.log(d)).catch(e => console.log(e));
module.exports = {
    tokenizer,
    tokenizer_iterator,
};

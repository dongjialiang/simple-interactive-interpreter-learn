const {
    is_digital,
    is_punctuation,
    is_point,
} = require('./type-detection');

const tokenizer = input => { // 切分token
    return input.split(/\s*(=|[-+*\/\%=\(\)]|[0-9]*\.?[0-9]+)\s*/).filter((d) => !d.match(/^\s*$/));
};

const tokenizer_iterator = async input => { // 使用迭代器切分token
    const asnycIterator = input[Symbol.iterator]();
    const token = [];
    let next = asnycIterator.next();
    await next;
    while(!next.done) {
        // console.log(/[0-9]/.test(next.value));
        switch (true) {
            case is_digital(next.value):
                let point_lock = false;
                let num = next.value;
                next = asnycIterator.next();
                await next;
                while (is_digital(next.value) | is_point(next.value)) {
                    if (is_point(next.value)) {
                        if (point_lock) {
                            throw 'SyntaxError: Unexpected number';
                        }
                        point_lock = true;
                    }
                    num += next.value;
                    next = asnycIterator.next();
                    await next;
                }
                point_lock = false;
                token.push(num);
                break;
            case is_punctuation(next.value):
                token.push(next.value);
                next = asnycIterator.next();
                await next;
                break;
            default:
                next = asnycIterator.next();
                await next;
                break;
        }
    }
    return token;
};
// tokenizer_iterator('8..9-9').then(d => console.log(d)).catch(e => console.log(e));
module.exports = {
    tokenizer,
    tokenizer_iterator,
};

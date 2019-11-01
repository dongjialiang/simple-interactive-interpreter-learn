import { dataStack, operatorStack } from './env';
const operators = { // 操作符的优先级
    '+': 13,
    '-': 13,
    '*': 14,
    '/': 14,
    '%': 14,
    '=': 10,
    '(': 20,
    ')': 20,
};
const ast = (token) => { // 生成ast树
    let tokens = token.slice(); // 复制一个token的数组
    let next = null;
    while (true) {
        if(tokens.length) { // 如果tokens不为空
            next = tokens.pop(); // 从后向前扫描
            if (next.type === 'punc') { // 如果next为操作符
                if(!operatorStack.length) { // 如果操作符栈为空
                    operatorStack.push(next);
                } else if(
                    operatorStack[operatorStack.length - 1].type === 'punc'
                    && operatorStack[operatorStack.length - 1].value === ')') { // 如果操作符栈顶为右括号
                    operatorStack.push(next);
                } else if(next.type === 'punc' && next.value === '(') { // 如果next为左括号
                    next = operatorStack.pop(); // 出栈
                    while(next.type === 'punc' && next.value !== ')') { // 直到右括号停止
                        dataStack.push([next, dataStack.pop(), dataStack.pop()]);
                        next = operatorStack.pop();
                    }
                } else if(
                    (next.type === 'punc'
                    && operatorStack[operatorStack.length - 1].type === 'punc')
                    && operators[operatorStack[operatorStack.length - 1].value] === operators[next.value]) { // 如果操作符优先级相同
                    operatorStack.push(next);
                } else if(next.type === 'punc' && (operators[operatorStack[operatorStack.length - 1].value] < operators[next.value])) { // 如果操作符优先级小于操作符栈顶元素
                    operatorStack.push(next);
                } else {
                    while(
                        operatorStack.length
                        && (next.type === 'punc'
                        && operatorStack[operatorStack.length - 1].type === 'punc')
                        && (operators[operatorStack[operatorStack.length - 1].value] > operators[next.value]
                        && operators[operatorStack[operatorStack.length - 1].value] < 20)
                    ) { // 直到操作符栈顶元素优先级等于()并且小于next的优先级时停止
                        dataStack.push([operatorStack.pop(), dataStack.pop(/*  */), dataStack.pop()]);
                    }
                    operatorStack.push(next);
                }
            } else {
                dataStack.push(next);
            }
        } else if(operatorStack.length) { // 如果操作符栈不为空
            next = operatorStack.pop(); // 出栈
            if (next.type === 'punc' && (operators[next.value] !== 20)) { // 如果next不为()
                dataStack.push([next, dataStack.pop(), dataStack.pop()]);
            }
        } else {
            break;
        }
        // console.log(JSON.stringify([ dataStack, operatorStack, tokens, ['end'] ]));
    }
    return dataStack;
};
export { ast };

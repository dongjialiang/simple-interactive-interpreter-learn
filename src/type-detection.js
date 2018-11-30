const is_digital = token => /[0-9]/.test(token); // 数字
const is_punctuation = token => /[-+*\/\%=\(\)]/.test(token); // 标点符号
const is_point = token => /[\.]/.test(token); // 点号
const is_string = token => token === '"' || token === "'" || token === '`'; // 字符串

module.exports = {
    is_digital,
    is_punctuation,
    is_point,
    is_string,
};

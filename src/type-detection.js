const is_digital = token => /[0-9]/.test(token);
const is_punctuation = token => /[-+*\/\%=\(\)]/.test(token);
const is_point = token => /[\.]/.test(token);

module.exports = {
    is_digital,
    is_punctuation,
    is_point,
};

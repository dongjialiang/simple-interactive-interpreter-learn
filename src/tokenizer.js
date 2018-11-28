const tokenizer = input => { // 切分token
    return input.split(/\s*(=|[-+*\/\%=\(\)]|[0-9]*\.?[0-9]+)\s*/).filter((d) => !d.match(/^\s*$/));
};
module.exports = { tokenizer };

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: { interpreter: './src-ts/interpreter.ts' },
    resolve: { extensions: ['.mjs', '.js', '.ts'] },
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
        ]
    },
};

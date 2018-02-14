const path = require('path');

module.exports = {

    devtool: 'source-map',

    entry: {
        index: './src/index.js'
    },

    node: {
        __dirname: false,
        __filename: false
    },

    output: {
        filename: '[hash].js',
        path: path.resolve(path.join(__dirname, 'dist')),
        publicPath: '/'
    },

    plugins: [],

    resolve: {
        modules: [
            'node_modules',
            path.resolve(path.join(__dirname, 'src'))
        ]
    }

};

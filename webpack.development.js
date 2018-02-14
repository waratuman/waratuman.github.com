const common = require('./webpack.common');
const http = require('http');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {

    devServer: {
        historyApiFallback: true,
        hot: true,
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: [
                    'elm-hot-loader',
                    'elm-webpack-loader'
                ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    ]

});

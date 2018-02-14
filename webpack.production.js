const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const extractCSS = new ExtractTextPlugin('[contenthash].css');

class ManifestSeedHtmlWebpackPlugin {

    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback) => {
                manifestSeed['index.html'] = htmlPluginData.plugin.childCompilationOutputName;
                callback(null, htmlPluginData);
            });
        });
    }
}

module.exports = merge(common, {

    module: {
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: 'elm-webpack-loader'
            },
            {
                test: /\.css/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        'postcss-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: '[hash].html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        extractCSS,
        new CompressionPlugin(),
        new MinifyPlugin(),
        new ManifestSeedHtmlWebpackPlugin(),
        new ManifestPlugin()
    ]

});

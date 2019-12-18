// webpack v4
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var glob = require("glob");

module.exports = async (env, argv) => {
    const config = {
        entry: {
            main: glob.sync('./assets/js/**/*.js')
        },
        output: {
            path: path.resolve(__dirname, 'assets/dist'),
            filename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.s[c|a]ss$/,
                    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('assets/dist', {}),
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css',
            }),
            new WebpackMd5Hash()
        ]
    };

    return config;
};

// webpack v4
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const downloadExternal    = require('./assets/webpack/downloadExternalAssets.webpack');
const externalsOutputPathJS  = path.resolve('./assets', 'js', 'external');

module.exports = async (env, argv) => {
    // External Sources Preparing
    const externalSourcesJS = [
        "https://unpkg.com/wavesurfer.js"
    ];

    // Path to put the external assets to
    for (const assetUrl of externalSourcesJS) {
        let path = await downloadExternal(assetUrl, externalsOutputPathJS);
    }

    const config = {
        entry: {
            main: './assets/js/imports.js'
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

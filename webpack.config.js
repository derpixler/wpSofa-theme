// webpack v4
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require("glob");
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin();

module.exports = async (env, argv) => {
    const entries = (moduleBase) => {
        var entries = {
            coreBundle: glob.sync('./assets/js/**/*.js')
        };

        const files = glob.sync('./' + moduleBase + '/**/assets/js/**/*.js');

        if(files.length > 0){
            files.map((file) => {
                const pattern = moduleBase+"[\\/](.*?)[\\/]assets[\\/]js[\\/](.*?)\.js([\\/]|$)";
                const entry = file.match(pattern);
                entries[entry[1]] = './' + entry[0];
            });
        }

        return entries;
    };

    const config = {
        devtool: 'source-map',
        entry: entries('template-parts'),
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
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader?sourceMap'
                        ]
                }
            ]
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    }
                },
            },
        },
        plugins: [
            new CleanWebpackPlugin('assets/dist', {}),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new WebpackMd5Hash(),
            new AssetsPlugin({
                processOutput: function (assets) {
                    return 'window.staticMap = ' + JSON.stringify(assets)
                },
                filename: 'assets/dist/assets.json'
            })
        ]
    };

    return config;
};

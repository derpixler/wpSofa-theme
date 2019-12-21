// webpack v4
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
                entries[entry[1]] = './' + moduleBase + '/' + entry[1] + '/assets/webpack.imports.js';
            });
        }

        return entries;
    };

    const config = {
        devtool: 'source-map',
        entry: entries('template-parts'),
        output: {
            path: path.resolve(__dirname, 'assets/dist'),
            filename: '[name].bundle.[chunkhash].js',
            chunkFilename: '[name].chunk.js',
            publicPath: () => {
                let pathAsArray = path.resolve(__dirname).split('/').reverse();
                let arrayPath = [];

                for(i=0;i < 3;i++){
                    arrayPath.push(pathAsArray[i]);
                }

                return arrayPath.reverse().join("\\") + "/assets/dist/";
            }
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
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
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

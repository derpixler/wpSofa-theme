// webpack v4
const path = require('path');
const buildConfig = require('./build.config');
const WebpackMd5Hash = require('webpack-md5-hash');
const glob = require('glob');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const log = require('signale');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const hash = require( 'object-hash' );
const fs = require('fs');

module.exports = async (env, argv) => {
  const mode = argv.mode || 'development';
  const version = hash(Date.now()).substring(0, 12);
  const moduleBase = 'template-parts';
  const packageBase = 'build';

  let devToolMode = 'hidden-source-map';
  let host = 'https://wp-sofa.de/';
  let StyleInjectMode = 'styleTag';
  let themeName = '';

  if (mode === 'development') {
    host = 'http://wpsofa.podcast/';
    devToolMode = 'source-map';
    StyleInjectMode = 'styleTag';
  }

  fs.readFile( path.resolve(__dirname, 'style.css'), 'utf8', (err, data) => {
    if (err) throw err;
    data = new Uint8Array(Buffer.from(data.replace(/Version: (.*?)-.*?\n/g, 'Version: $1-' + version + '\n')));
    fs.writeFile(path.resolve(__dirname, 'style.css'), data, (err) => {
      if (err) throw err;
      console.log('style.css version updated.' );
    });
  });

  const logOutput = `
        mode: ${mode}
        devtool: ${devToolMode},
        host: ${host},
        version: ${version},
        StyleInjectMode: ${StyleInjectMode}`;

  log.info(logOutput);

  const entries = (moduleBase, webpackImports) => {
    const entries = {
      coreBundle: glob.sync('./assets/js/**/*.js'),
    };

    const webpackFiles = glob.sync('./' + moduleBase + '/**/assets/' + webpackImports);

    if (webpackFiles.length > 0) {
      webpackFiles.map((file) => {
        const pattern = moduleBase+'[\\/](.*?)[\\/]assets[\\/]*.+\\.js$';
        const entry = file.match(pattern);

        entries[entry[1]] = './' + moduleBase + '/' + entry[1] + '/assets/' + webpackImports;
      });
    }

    return entries;
  };

  const publicPath = () => {
    const pathAsArray = path.resolve(__dirname).split('/').reverse();
    const arrayPath = [];

    for (i=0; i < 3; i++) {
      arrayPath.push(pathAsArray[i]);
    }
    themeName = arrayPath[0];

    return host + arrayPath.reverse().join('\/') + '/assets/dist/' + version + '/';
  };

  const config = {
    mode: mode,
    devtool: devToolMode,
    entry: entries('template-parts', 'webpack.imports.js'),
    output: {
      path: path.resolve(__dirname, 'assets/dist/' + version + '/'),
      filename: '[name].bundle.[chunkhash].js',
      chunkFilename: '[name].chunk.js',
      publicPath: publicPath(),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      /* runtimeChunk: 'single',
						 splitChunks: {
							 chunks            : 'all',
							 maxInitialRequests: Infinity,
							 minSize           : 0,
							 cacheGroups       : {
								 vendor: {
									 test: /[\\/]node_modules[\\/]/,
									 name( module ) {
										 // get the name. E.g. node_modules/packageName/not/this/part.js
										 // or node_modules/packageName
										 const packageName = module.context.match( /[\\/]node_modules[\\/](.*?)([\\/]|$)/ )[ 1 ];

										 // npm package names are URL-safe, but some servers don't like @ symbols
										 return `npm.${packageName.replace( '@', '' )}`;
									 }
								 }
							 }
						 }*/
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        /*{
          test: /\.js$/,
          exclude: [/node_modules/, /\webpack.*.js$/],
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },*/
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.s[c|a]ss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                // injectType: StyleInjectMode
                injectType: 'styleTag',
              },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader?sourceMap',
          ],
        },

      ],
    },
    plugins: [
      new FileManagerPlugin(buildConfig(mode, themeName, packageBase, moduleBase, version)),
      new WebpackMd5Hash(),
      new AssetsPlugin({
        processOutput: function(assets) {
          return version;
        },
        filename: 'assets/dist/' + version + '/version.txt',
      }),
    ],
  };

  return config;
};

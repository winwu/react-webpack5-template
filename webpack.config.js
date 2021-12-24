const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProduction = env.production === true;

    return {
        devtool: isProduction ? isProduction : 'source-map',
        mode: isProduction ? 'production' : 'development',
        entry: {
            app: './src/index.tsx',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[chunkhash].js' : '[name].[hash:8].js',
            // sourceMapFilename only takes effect when devtool is set to 'source-map'
            sourceMapFilename: '[file].map[query]',
            chunkFilename: '[id].[hash:8].js',
            publicPath: '/',
            // publicPath: 'https://some.of.com/assets/[fullhash]/',
            assetModuleFilename: 'images/[hash][ext][query]',
            // clean ./dist before build
            clean: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.json'],
            // alias: {},
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            // https://webpack.js.org/plugins/mini-css-extract-plugin/#recommend
                            // creates separate css files for production
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name].[hash][ext]'
                    }
                }
            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Project Title',
                template: 'index.html',
            }),
        ].concat(isProduction ? [new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })] : []),
        optimization: {
            splitChunks: {
                // chunks: 'async',
                // minSize: 20000,
                // minRemainingSize: 0,
                // minChunks: 1,
                // maxAsyncRequests: 30,
                // maxInitialRequests: 30,
                // enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        // priority: -10,
                        // reuseExistingChunk: true,
                    },
                    default: false,
                },
            },
        },
    }
}

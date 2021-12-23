const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? false : 'source-map',
    entry: {
        app: 'src/app.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        // sourceMapFilename only takes effect when devtool is set to 'source-map'
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].map',
        publicPath: '/',
        // publicPath: 'https://some.of.com/assets/[fullhash]/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.json'],
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
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader?modules=true',
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Project Title',
            template: 'index.html',
        }),
    ],
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

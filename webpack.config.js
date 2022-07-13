/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { SWCMinifyPlugin } = require('swc-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: devMode,
    target: !devMode ? ['web', 'es6'] : 'web',
    entry: {
        main: './src/index.tsx'
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve('./dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /(\.?ts$|\.?tsx$)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'swc-loader',
                    }
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                ],

            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [].concat(devMode ? [
        new HtmlWebpackPlugin({
            title: "Home",
            description: "This is the first page",
            template: 'src/templates/index.hbs',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin()
    ] : [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            title: "Home",
            description: "This is the first page",
            template: 'src/templates/index.hbs',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin()
    ]),
    optimization: {
        minimize: !devMode,
        minimizer: !devMode ? [
            new CssMinimizerPlugin(),
            new SWCMinifyPlugin()
        ] : undefined,
        splitChunks: !devMode ? {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'
        } : undefined
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            pages: path.resolve(__dirname, 'src/pages/'),
            themes: path.resolve(__dirname, 'src/themes/'),
            common: path.resolve(__dirname, 'src/pages/common/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, './dist/')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        },
        hot: true
    },
    devtool: false,
}
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Happypack = require('happypack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    // 对模块处理
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                // use: 'happypack/loader?id=js'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                {
                    loader: 'less-loader',
                }],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            esModule: true,
                            modules: true
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: path.resolve(__dirname, "template/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        // new Happypack({
        //     id: 'js',
        //     use: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: [
        //                 '@babel/preset-env',
        //                 '@babel/preset-react'
        //             ]
        //         }
        //     }]
        // })
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
        hints: "warning"
    },
    resolve: {
        // 自动解析文件扩展名
        extensions: [".ts", ".tsx", '.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, "src"),
            assets: path.resolve(__dirname, "src/assets"),
            utils: path.resolve(__dirname, "src/utils"),
            pages: path.resolve(__dirname, "src/pages"),
            components: path.resolve(__dirname, "src/components")
        }
    }
};
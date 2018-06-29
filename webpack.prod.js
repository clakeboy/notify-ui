import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
let cfg = require('./webpack.common').default;

export default merge(cfg,{
    entry: {
        //主文件
        index : './src/index.jsx'
    },
    //插件项
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial"
                }
            }
        },
        minimize:true,
    },
    mode: 'production',
});
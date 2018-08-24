const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle-[hash].js"//打包后输出文件的文件名
        // filename: '[name]-[hash].js',
        // chunkFilename: '[id].chunk.js',
        // path: path.join(__dirname, '/build'),
        // publicPath: '/build/'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8190,
                        name: '[name].[ext]'
                    }
                },
                exclude: /^node_modules$/
            },
            {
                test: /\.less$/i, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: true } }, { loader: 'postcss-loader' }, 'less-loader'
                    ]
                })
            },
            {
                test: /\.css$/i, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { modules: true } }, { loader: 'postcss-loader' }
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: 'bundle-[hash].css', allChunks: true }),
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.css',
            '.less',
            '.json',
            '.gif',
            '.html',
            '.png',
            '.webp',
            '.jpg',

        ]
    }
}

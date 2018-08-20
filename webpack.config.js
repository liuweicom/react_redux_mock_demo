var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    resolve:{
        extensions:['.js','.jsx']//这里不能带有空格
    },

    module: {
        // preLoaders: [{
        //     test: /\.js$/, // 只针对js文件
        //     loader: 'eslint-loader', // 指定启用eslint-loader
        //     // include: dirVars.srcRootDir, // 指定审查范围仅为自己团队写的业务代码
        //     exclude: [/node_modules/], // 剔除掉不需要利用eslint审查的文件
        //  }],
        rules: [//这里有两种写法：rules（可以带拓展的参数）和loaders
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {    test: /\.less$/, 
                 exclude: /node_modules/,
                 use:[
                    {
                        loader:'style-loader',
                        options: {
                            sourceMap: true
                        }

                    },{
                        loader:'css-loader',
                         options: {
                             sourceMap: true
                         }

                     },{
                        loader:'postcss-loader',
                            options:{//POSTCSS必须带有配置
                                plugins: function () {
                                    return [autoprefixer]
                                },
                            sourceMap: true
                            }
                    },{
                        loader:'less-loader'
                    }
                 ]
            },
            { test: /\.css$/,
             exclude: /node_modules/,
             use:[
                {
                    loader:'style-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader:'css-loader' ,
                     options: {
                         sourceMap: true
                     }
                 },{
                    loader:'postcss-loader',
                        options:{//POSTCSS必须带有配置
                            plugins: function () {
                                return [autoprefixer]
                                },
                            sourceMap: true
                        }
                }
             ]
            },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/i,
              use:{
                  loader:'url-loader?limit=50000'
                  }  
            },  // 限制大小5kb
            { test:/\.(woff|woff2|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[chunkhash:8].[ext]'
                        }
                    },{
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[chunkhash:8].[ext]'
                        }
                    }
                ]

            } // 限制大小小于5k
        ]
    },
    
    //     eslint: {
    //     configFile: './.eslintrc' // Rules for eslint
    // },
 
   

    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
          //这里不写set NODE_ENV=production && webpack 会有警告
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],  
    devServer: {//这里面写的colors的配置文件已经过时了
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:8080',
            secure: false
          }
        },
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}

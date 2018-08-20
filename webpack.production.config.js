var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'hidden-source-map',
  entry: {
    app: path.resolve(__dirname, 'app/index.jsx'),
    // 将 第三方依赖（node_modules中的） 单独打包
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].[chunkhash:8].js",
      publicPath:'/'
  },

  resolve:{
      extensions:['.js','.jsx']
  },

  module: {
      rules: [//这里有两种写法：rules（可以带拓展的参数）和loaders
          {
              test: /\.(js|jsx)$/,
              use: {
                  loader: "babel-loader"
              },
              exclude: [/node_modules/]
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
                              return require("autoprefixer")({browsers: ['last 2 versions', 'chrome >=32', 'ie >= 8', 'safari >=9']})
                          }
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
                              return require("autoprefixer")({browsers: ['last 2 versions', 'chrome >=32', 'ie >= 8', 'safari >=9']})
                          }
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
                      loader: 'url-loader',
                      options: {
                          name: 'fonts/[name].[chunkhash:8].[ext]'
                      }
                  }
              ]

          } // 限制大小小于5k
      ]
  },
  
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin("Copyright by wangfupeng1988@github.com."),

    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.tmpl.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          //supresses warnings, usually from module minification
          warnings: false
        }
    }),
    
    // 分离CSS和JS文件
    new ExtractTextPlugin('/css/[name].[chunkhash:8].css'), 
    
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '/js/[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}
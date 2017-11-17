// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板生成插件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // css 和 js 文件分离 打包的 控件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件

module.exports = {
  entry: './src/main.js', //入口文件
  output: {
      path: path.resolve(__dirname, 'dist/build'), // 指定打包之后的文件夹
      //publicPath: '/assets/', //指定资源文件引用的目录
      // filename: 'bundle.js' // 指定打包为一个文件 bundle.js
      filename: '[name]-[hash].js' // 可以打包为多个文件
  },

  module: { 
    rules: [
      { // css 文件打包
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 使用“ExtractTextPlugin” 分离插件进行 css文件的 单独打包
          fallback: 'style-loader', 
          use: [
            {
              loader: 'css-loader',
              options: {
                // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
              }
            }, 
            {
              loader: 'postcss-loader',
              // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
              options: {
                plugins: function() {
                  return [
                      require('autoprefixer')
                  ];
                }
              }
            }
          ]
        })
      }, 
      { // stylus 文件的 打包
        test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({ // 使用‘ExtractTextPlugin’插件进行分离打包
            fallback: 'style-loader',
            use: [
              'css-loader', 
              {
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }, 
              'stylus-loader'
            ]
        })
      }, 
      { // js 文件 打包
        test: /\.js$/,
        loader: 'babel-loader', //此处不能用use，不知道为啥
        exclude: /node_modules/ //需要排除的目录
      }
    ]
  },

  plugins: [ // 调用 插件
    new HtmlWebpackPlugin({  //生成 html 入口文件的 插件
      template: './index.html', // 模版文件
      filename:'../index.html'
    }),
    new CleanPlugin(['dist/build']), // 清空 build文件夹
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors' // 将公共模块提取，生成名为`vendors`的chunk
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩js代码
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name]-[hash].css')
  ]

}











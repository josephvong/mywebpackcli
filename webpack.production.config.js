// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板生成插件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // css 和 js 文件分离 打包的 控件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: './src/main.js', //入口文件
  output: {
    path: path.resolve(__dirname, './dist/build'), // 指定打包之后的文件夹
    filename:'[name]-[hash].js',//path.posix.join('build','[name]-[hash].js'),
    publicPath: '/build/' 
  },
  resolve: {
    extensions: ['.js','.json','.styl'],
    alias: { 
      'common':path.join(__dirname, 'src/common'),
      'style': path.join(__dirname, 'src/style'),
    }
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
                      require('autoprefixer')({browsers:['last 5 versions']})
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
                      require('autoprefixer')({browsers:['last 5 versions']})
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
      },
      { //解析 .html 
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      { //解析 .tpl
        test: /\.tpl$/,
        use: 'ejs-loader'
      },
      { //解析 .ejs
        test: /\.ejs$/,
        use: 'ejs-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'images/[name][hash].[ext]',
        }
      },
      /*{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name:'./images/[name][hash].[ext]', 
        }
      }*/
    ]
  },

  plugins: [ // 调用 插件
    new HtmlWebpackPlugin({  //生成 html 入口文件的 插件
      template: './index.html', // 模版文件 （在src文件夹里面的 index.html文件）
      filename: '../index.html'//path.resolve(__dirname, './dist/index.html') // 生成的 文件 （包括路径）
    }),
    new CleanPlugin(['./dist']), // 清空 dist文件夹
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors' // 将公共模块提取，生成名为`vendors`的chunk
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩js代码
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename:'[name]-[hash].css'//path.posix.join('build','[name]-[hash].css')
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: '../static/', //path.resolve(__dirname + '/dist') ,
        ignore: ['.*']
      }
    ])
  ]

}











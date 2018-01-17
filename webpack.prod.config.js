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
    filename:'[name]-[hash].js',//
    // 配置打包好的html/css/js文件里面的 公共资源路径，可以通过具体部署环境来配置（如/subDomain/build/）
    publicPath: '/hciWeb/build/'  // 无论部署到哪里，最后一定要 跟着 ‘/build/’
  },
  resolve: { // 解析与路径别名配置
    extensions: ['.js','.json','.styl'],
    alias: { 
      'common':path.join(__dirname, 'src/common'),
      'style': path.join(__dirname, 'src/style'),
    }
  },
  externals: { // 外部资源 的引导
    'jquery': 'window.jQuery',
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
      filename: '../index.html'//  生成的 路径+名称 对应 output的设置
    }),
    new CleanPlugin(['./dist/build/']), // 清空 dist文件夹

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors' // 将公共模块提取，生成名为`vendors`的chunk
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩js代码
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({ // 将 打包到js 里面的 css 样式分离出一个文件来
      filename:'[name]-[hash].css'
    }),
    //把 固定 的 资源文件（字体/不打包库）拷贝到 dist/static 文件夹内
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: '../static/', //
        ignore: ['.*']
      }
    ]),
    
  ],

  /* 目前和 dev的区别 是 没有了监听
  watch:true, // 开启监听模式

  watchOptions:{  // 监听模式 的 参数配置
    ignored:/node_modules|static/, // 对以下类型 的文件 排除监听
    poll:1000,   // 监听频率 1s  
  }*/

}











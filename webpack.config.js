const path = require('path') //调用 node 的 path 自带库  
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成 html 文件
//var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry:{main:path.join(__dirname,'src','main.js')},  // 定义入口js ，可以定义 多个 入口js，下面的 output中 用 [name].js 来弹性输出不同名称的 入口文件
    
  output:{ // 定义（入口文件的）输出（实际挂在到index.html入口文件的js文件名）
    filename:'[name].js',
    path: path.join(__dirname, 'dist/build'), // 指定打包之后的文件夹 
    //publicPath: '/build/'  
  },
  resolve: {
    extensions: ['.js','.json','.styl'],
    alias: { 
      'common':path.join(__dirname, 'src/common'),
      'style': path.join(__dirname, 'src/style'),
    }
  },
  externals: {
    'jquery': 'window.jQuery',
  },  
  module:{ // 注册各种模块
    // 注册 各种 loader 加载器
    rules:[ 
      {
        test:/\.js$/,  // 正则验证 .js 结尾的 文件
        exclude: /node_modules/,  // 排除 项目里 node_module 里面的 js文件（不进行处理）
        loader: 'babel-loader'  // 使用 loader babel-loader (此处不能使用 ‘use’)
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
      { // css 的打包 请参考 https://www.cnblogs.com/doudoujun/p/6405534.html
        test:/\.css$/, 
        use: [
          'style-loader', {
              loader: 'css-loader',
              options: {
                modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
              }
          }, 
          {
            loader: 'postcss-loader',
            // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
            options: {
              sourceMap: true,
              plugins: function() {
                return [
                  require('autoprefixer')({browsers:['last 5 versions']})
                ];
              }
            }
          }
        ]
      },
      { // stylus 打包模块
        test: /\.styl(us)?$/,
        use: [
            'style-loader', 'css-loader', {
                loader: "postcss-loader",
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')({browsers:['last 5 versions']})
                        ];
                    }
                }
            }, 'stylus-loader'
        ]
      },
      { // 图片打包模块
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
         options: {
          limit: 10000,
          name:'./images/[name][hash].[ext]',
          //fallback: 'file-loader'
        }
      }
      
    ]
  },
  devServer: { // 配置 开发服务器 
    contentBase: './', // 本地服务器所加载的页面所在的目录
    hot: true,  //配置HMR之后可以选择开启
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新 
    disableHostCheck:true  // 开启通过IP 进行访问 （无需仅仅 localhost）
  },
  plugins: [
     
    // 生成 html 的 控件
    new HtmlWebpackPlugin({ 
      template: './index.html', // 模版文件
      //filename: '../dev_index.html'//  生成的 文件 （包括路径） 
    }),  

    new webpack.HotModuleReplacementPlugin(), // 热加载插件
  ],

  devtool:'eval-source-map'

  /*watch:true, // 开启监听模式

  watchOptions:{  // 监听模式 的 参数配置
    ignored:/node_modules|dist|build|docs|css/, // 对以下类型 的文件 排除监听
    poll:1000,   // 监听频率 1s  
  }*/
}
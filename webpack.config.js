const path = require('path') //调用 node 的 path 自带库  
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成 html 文件

module.exports = {
  entry:'./src/main.js',/*{  // 定义入口js ，可以定义 多个 入口js，下面的 output中 用 [name].js 来弹性输出不同名称的 入口文件
    'main':'./src/main.js'  // 定义 “/app/main.js”文件 为 入口文件
  },*/
  output:{ // 定义（入口文件的）输出（实际挂在到index.html入口文件的js文件名）
    path:path.resolve(__dirname,'dist'),//输出路径 '__dirname'是表示主目录的常量，这段代码是表示在主目录‘解析（读/建）’build文件夹，来存放输出的（入口）js文件  
    
    filename:'build/[name].bundle.js', // '[name]'表示这个输出文件以前面定义的entry入口js名称来命名输出
    //publicPath: 'build/',
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
        use: 'html-loader'
      },
      { //解析 .tpl
        test: /\.tpl$/,
        use: 'ejs-loader'
      },
      { // css 打包模块
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
          name: 'images/[name].[ext]?[hash:12]', 
          //fallback: 'file-loader'
        }
      }
      /*{ // 暂时不使用 file-lader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return process.env.NODE_ENV === 'production'?'[hash].[ext]':'[path][name].[ext]'
          },
          outputPath:'images'
        }
      }*/
    ]
  },
  devServer: { // 配置 开发服务器 
    contentBase: "./", // 本地服务器所加载的页面所在的目录
    hot: true, // 配置HMR之后可以选择开启
    historyApiFallback: true, // 不跳转
    inline: true // 实时刷新
  },
  plugins: [
    // 生成 html 的 控件
    new HtmlWebpackPlugin({ 
      template: './index.html', // 模版文件 
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
// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板生成插件
//var ExtractTextPlugin = require('extract-text-webpack-plugin'); // css 和 js 文件分离 打包的 控件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var CopyWebpackPlugin = require('copy-webpack-plugin')  // 用于复制 static文件夹到打包环境的 控件


module.exports = {
  entry: './src/main.js', //入口文件
  output: {
    path: path.resolve(__dirname, './dist/build'), // 指定打包之后的文件夹
    filename:'[name].js',//输出文件名
    publicPath: './build/'  // 公共路径 控制 html以及其他文件中的添加的 url路径的 前面指向位置 
  },
  resolve: { // 添加 项目中 一些文件夹的 引用别名（在开发时 可以通过别名来引入）
    extensions: ['.js','.json','.styl'],
    alias: { 
      'common':path.join(__dirname, 'src/common'),
      'style': path.join(__dirname, 'src/style'),
    }
  },
  externals: {  // 由于 本 项目中 jquery通过 <script>方式引入，此处定义模块中使用jquery时进行引导
    'jquery': 'window.jQuery',
  }, 
  module: { 
    rules: [
      
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
          name:'images/[name].[ext]',  //通过 publicPath(/build/) 打包到 /build/images/文件夹内
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
    new CleanPlugin(['./dist']), // 清空 dist文件夹 
    new HtmlWebpackPlugin({  //生成 html 入口文件的 插件
      template: './index.html', // 模版文件 （在src文件夹里面的 index.html文件）
      filename: '../index.html'// 生成的 路径+名称 对应 output的设置
    }),

    

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: '../static/', //
        ignore: ['.*']
      }
    ]), 
  ],

  watch:true, // 开启监听模式

  watchOptions:{  // 监听模式 的 参数配置
    ignored:/node_modules|static/, // 对以下类型 的文件 排除监听
    poll:1000,   // 监听频率 1s  
  }

}











const path =  require('path') // node 的 路径 组件
const bodyParser = require('body-parser'); 
process.env.NODE_ENV = "development"


// express 框架
const express = require('express')
const app = express();


//------webpack 配置----
 
//------------



app.use('/', express.static(__dirname+'/dist'))  // 配置静态资源路径

app.get('/*',function(req,res){ 
  res.redirect('/')
})

app.listen(3000)
import 'babel-polyfill' // es6 语法兼容补丁 一定要放到最开始
import './style/index.styl'

//import {platForm} from "common/js/cusFn"
import {getActivityData} from "common/api/activityApi"

import MissionBoxInit from './components/mission/mission.js'


//import vConsole from 'vconsole'
//var Console = new vConsole();

/*
// 控制App 自动调用 callback 函数
var plat = platForm();  // 获取当前浏览器 类型
var ua = window.navigator.userAgent.toLowerCase();// 记录当前浏览器的类型值

var info = {
  "sign":"9143084D7BCCFC217F545FC4C70E24FE",
  "user_id":"549235",
  "session_id":"nrui53ubhlq3lbkcpcjhshhj85",
  "user_type":"体验用户" 
}
// 获取用户信息
if (ua.indexOf('kachabrowser') != -1) {
    // 如果在app里请求调用callbackfunction获取用户ID
    if ("iphone" == plat || "ipod" == plat || "ipad" == plat) {
      window.location.href = "KachaJSBridge://1";  // 浏览器 路径以改变时app自动调用上面的callbacks 函数  
      alert("D")
      //window.kachaUserInfo = info
    } else { 
      window.kacha.jsInvoke(1);  // 浏览器 路径以改变时app自动调用上面的callbacks 函数
    } 
}else{
  // 非APP 中打开页面 
  window.kachaUserInfo = info
}

*/ 

const pageInit = function () {
  getActivityData(window.kachaUserInfo).then((res)=>{
    console.log(res)
    let missionListHtml = ''
    let objList = res;
    for (var i = 0; i < objList.length; i++) {
      missionListHtml += MissionBoxInit(objList[i])
    }
    document.querySelector("#missionList").innerHTML = missionListHtml   
  }).catch((err)=>{
    //console.log(JSON.stringify(err))
    document.querySelector("#app").innerHTML = '<h1 style="text-alignc:center;font-size:0.4rem">登录出错</h1>'
  })
  
}

setTimeout(()=>{ 
  pageInit()

},100)



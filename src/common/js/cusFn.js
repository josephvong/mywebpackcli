// style() 输出 对象 某个 css 样式 的属性值 函数 使用 styel(dom,'background-position')
export function style(el, prop){
  return typeof getComputedStyle !== 'undefined'
  ? getComputedStyle(el, null).getPropertyValue(prop)
  : el.style[prop]
}

//-----------------------------------------------------------------------------------------
// 当使用js 添加 样式时，自定义函数自动补充 样式的 浏览器前缀
let elementStyle = document.createElement('div').style  // 创建一个 临时dom 节点 并获取 style 数据 集合

let vendor= (()=>{  // 自执行函数
	let transformNames = {  // 定义一个 需要各个 浏览器前缀 的 css 属性 集合
		webkit:'webkitTransform',
		Moz:'MozTransform',
		O:'OTransform',
		ms:'msTransform',
		standard:'transform'
	}
	for(let key in transformNames){ // 遍历 上面定义的 各浏览器前缀的 css 属性 集合
		if(elementStyle[transformNames[key]]!==undefined){ // 在 dom 的 style属性集合中 遍历查找 ‘transformNames’ 的key
			return key    // 如果 key 存在， 就返回 对应 供应商前缀的 key （css前缀的名）
		}
	}
	return false  // 如果没有，不反回
})()

// 最终 输出 在js 添加 css样式时，自动补全供应商前缀的函数
export function prefixStyle(style){  // 参数为 css 样式属性
	if(vendor === false){ // 没有 供应商前缀返回
		return false   // 返回
	}
	if(vendor === 'standar'){ //如果为基础 css 属性
		return style   // 直接返回 style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
	// 返回 前缀 和 style属性名 首字母大写 拼接后的 样式 属性名
}


//-----------------------------------------------------------------------------------------
// 判断 类名 是否存在的 函数
export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)'+ className +'(\\s|$)') // 正则为： 有或没有空格 开头，有或没有空格结尾
	return reg.test(el.className)
}

//--------------------------------------------------------------------------------------------
// 给节点 动态 添加 类名 的函数
export function addClass(el,className){
	if(hasClass(el,className)){return} // 调用 ‘hasClass’ 函数 判断要添加的类名是否已经添加
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

//------------------------------------------------------------
// 寻找指定类名 的 父节点 (找到 el 节点 的 指定类名的 祖先节点)
export function findTargetParent(el,className){
	let obj = el;
	let cName = className;
	while(obj.tagName!=="BODY" && !hasClass(obj,cName)){
		obj = obj.parentNode
	}
	return obj
}

//---------------------------------------------------------------
// 延时执行节流函数 基础版    函数的参数：一个真实执行的函数 , 延时时间段
export function debounce(fn,delay){
  let timer // 创建一个变量
  return function (...args){ // debounce 函数 输出一个 函数
    if(timer){
      clearTimeout(timer) // 如果timer 变量里面有 计时器对象，清除计时器
    }
    timer = setTimeout(()=>{ // 重新创建计时器来执行 函数
       // 对参数内要执行的函数 延时执行
      fn.apply(this,args)// 用apply() 绑定 this（调用debounce的对象） 到 fn 中
    },delay)
  }
}

// 延时执行节流函数 高级版（使一些 需要连续 重复执行的函数 延时一定时间来执行，减少重复）
export function throttle (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
        if (timeout) {
            return
        }
        let elapsed = Date.now() - lastRun
        let context = this
        let args = arguments
        let runCallback = function () {
                lastRun = Date.now()
                timeout = false
                action.apply(context, args)
            }
        if (elapsed >= delay) {
            runCallback()
        }
        else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}


//------------------------------------------------------------------
// 数组查找获取函数
export function arrFind(arr,fn){
  if(Array.prototype.find){ // 如果 Array 本身有 find 函数
    return Array.prototype.find.call(arr,fn) // 直接调用 find 函数
  }else{
    let item
    for (let i =0; i < arr.length; i++) {
      if(fn(arr[i])){ // 如果 fn return的内容存在(fn(item) 遍历操作数组的每个item )
        item = arr[i]; // 把 arr[i] 赋值给 item
        break // 跳出循环
      }
    }
    return item
  }
}

//----------------日期格式化---------------------
export function dateFormat(oDate,fmt) {
  var o = {
      "M+": oDate.getMonth() + 1, //月份
      "d+": oDate.getDate(), //日
      "h+": oDate.getHours(), //小时
      "m+": oDate.getMinutes(), //分
      "s+": oDate.getSeconds(), //秒
      "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
      "S": oDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)){fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));}
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


//------------------------------------------数组去重----------------------------------------------------
export function unique(arr){ // 排序去重方法
  return arr.concat().sort().filter(function(item,index,arr){ // 现将数组排序后 用filter() 过滤输出去重
    // index 不为0  且  当前 item 不等于上一个 item
    return !index || item !==arr[index-1]
  })
}


// --------------------------------url 参数 获取--------------------------------------
export function getQuery(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数 
  if (r != null) return decodeURIComponent(unescape(r[2])); return null; //返回参数值
}


//--------------------------------输出平台名称--------------------------
export function platForm() {
    var a = window.navigator.userAgent.toLowerCase();
    var b = a.match(/(iphone|ipod|ipad|android|windows phone|blackberry|symbian|Windows Phone)/);
    if (!!b) {
        b = b.toString();
    }
    if (b) {
        if (b.indexOf("iphone") >= 0) {
            return "iphone"
        } else if (b.indexOf("ipod") >= 0) {
            return "ipod"
        } else if (b.indexOf("ipad") >= 0) {
            return "ipad"
        } else if (b.indexOf("android") >= 0) {
            return "android"
        } else if (b.indexOf("windows phone") >= 0) {
            return "wp7"
        } else if (b.indexOf("symbian") >= 0) {
            return "symbian"
        } else if (b.indexOf("blackberry") >= 0) {
            return "blackberry"
        } else if (b.indexOf("Windows Phone") >= 0) {
            return "wp7"
        } else {
            return "unknow"
        }
    }
    return "unknow"
}

//----------------------输出是否微信--------------------------------
export function is_weixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)!="micromessenger") {
        return false;
    } else{
      return true;
    }
}


//------------------------------数组转json 字符串----------------------------------
export function arrayToJson(o){
  var r = [];
  if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
  if (typeof o == "object") {
    if (!o.sort) {
      for (var i in o)
        r.push(i + ":" + arrayToJson(o[i]));
      if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
        r.push("toString:" + o.toString.toString());
      }
      r = "{" + r.join() + "}";
    } else {
      for (var i = 0; i < o.length; i++) {
        r.push(arrayToJson(o[i]));
      }
      r = "[" + r.join() + "]";
    }
    return r;
  }
  return o.toString();
}












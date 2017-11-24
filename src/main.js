import 'babel-polyfill' // es6 语法兼容补丁 一定要放到最开始
import './style/index.styl'

 
// 子模块
import BannerInit from './components/banner/banner.js'
import { getSlider } from 'simple-slider';
//import entryCont from './components/entry/entry.js'
 

 
 
const pageInit = function () {
  BannerInit().then((res)=>{
    console.log(res)
    getSlider({
      container: res.querySelectorAll('.banner-wrap .slider')[0],
      children:res.querySelectorAll('.banner-wrap .slider img'),
      transitionTime:1,
      delay:3.5
    })
  }) 
  const Entry = document.querySelector('#Entry');
  Entry.innerHTML = '00阿斯顿发送到000' 
  
  
 
  
  
  /*const Banner = document.querySelector('#Banner');
  .then((res)=>{
    Banner.innerHTML = res;
  })*/
  //let layout = new Layout();
  /*dom.innerHTML = layout.tpl({
    components:components
  });*/
  //dom.innerHTML = LayoutHTML//'<h1>hello world</h1>'
}

pageInit() 
alert("E")

 
    

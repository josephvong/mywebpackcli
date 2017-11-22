import './style/index.styl'

 
// 子模块
import BannerInit from './components/banner/banner.js'
//import entryCont from './components/entry/entry.js'

import Swiper from 'swiper'

let mySwiper
function SwiperInit(DOM){ 
  mySwiper = new Swiper(DOM,{ 
    /*initialSlide:1,
    longSwipesRatio:0.9,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    updateOnImagesReady : true,*/
  }) 
}
 
const pageInit = function () {
  BannerInit().then((res)=>{
    console.log(res)
    let swiperWrap = res.querySelectorAll('.swiper-container')[0]
    SwiperInit(swiperWrap) 
  })
  
  
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


setTimeout(function(){
  mySwiper.init(); 
},600)
    

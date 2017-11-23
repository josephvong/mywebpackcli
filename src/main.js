import './style/index.styl'

 
// 子模块
import BannerInit from './components/banner/banner.js'
//import entryCont from './components/entry/entry.js'

import Swiper from 'swiper'

 
 
const pageInit = function () {
  BannerInit().then((res)=>{
    const Entry = document.querySelector('#Entry');
    Entry.innerHTML = 'AAAAAAAAAAAA'
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
alert("A")

 
    

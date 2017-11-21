import './style/index.styl'

import Layout from './components/layout/layout.js'
// 子模块
import BannerInit from './components/banner/banner.js'
import entryCont from './components/entry/entry.js'


//const bannerCont = new Banner() 

BannerInit().then((res)=>{
  console.log(res)
})

const components = {
  banner:'',//bannerCont.tpl(),
  entry:entryCont 
}

const App = function () {
  const dom = document.querySelector('#app');
  let layout = new Layout();
  dom.innerHTML = layout.tpl({
    components:components
  });
}
new App()

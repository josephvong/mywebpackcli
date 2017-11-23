import tpl from './banner.ejs'
import './banner.styl'
import getCarouselData from 'common/api/carousel_api'


const BannerInit = function(){
  const Banner = document.querySelector('#Banner');
    Banner.innerHTML = tpl() 
  /*return getCarouselData().then((res)=>{
    
    return Promise.resolve(Banner) 
  })*/ 
}

module.exports = BannerInit
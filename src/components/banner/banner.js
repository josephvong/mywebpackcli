import tpl from './banner.ejs'
import './banner.styl'
import getCarouselData from 'common/api/carousel_api'

const BannerInit = function(){ 
  return getCarouselData().then((res)=>{
    const Banner = document.querySelector('#Banner');
    Banner.innerHTML = tpl()
    return Promise.resolve(res) 
  }) 
}

module.exports = BannerInit
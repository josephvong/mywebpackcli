import tpl from './banner.ejs'
import './banner.styl'
import {getCarouselData} from 'common/api/carousel_api'
import $ from 'jquery'

const BannerInit = function(){ 
  return getCarouselData().then((res)=>{ 
    const Banner = document.querySelector('#Banner');
    Banner.innerHTML = tpl({
      bannerList:res
    }) 
    return Promise.resolve(Banner) 
  }) 
}

export default BannerInit
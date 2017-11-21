import tpl from './banner.ejs'
import './banner.styl'
import getCarouselData from 'common/api/carousel_api'


/*function Banner() {
  return { 
    tpl: tpl
  }
}*/

const BannerInit = function(){
  return getCarouselData().then((res)=>{ 
    return Promise.resolve(tpl({
      bannerData:res
    }))
  })
}

module.exports = BannerInit
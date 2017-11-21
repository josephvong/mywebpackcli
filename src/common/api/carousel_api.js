import axios from 'axios'

module.exports = function getCarouselData(){
  // let params = new URLSearchParams();
  // params.append('dtype',2)
  // let data = {wordStr:value}
  // params.append('jparams',JSON.stringify(data)); // 转换传参结构

  return axios.get(`http://m.9kacha.com/channel_test/api/carousel_bar.php?${Math.random(10000)}`).then((res)=>{ //数据链接成功
     return Promise.resolve(res.data)
  }).catch((err)=>{
    console.log(err);
  })
}
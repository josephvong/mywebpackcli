import axios from 'axios'
import 'url-search-params-polyfill'
export function getActivityData(info){
  let params = new URLSearchParams();
  let data = {
    user_id:info.user_id,
    session_id:info.session_id 
  }
  params.append('jparams',JSON.stringify(data)); // 转换传参结构

  return axios.post(`https://integrate.9kacha.com/show_activity.php?${Math.random(10000)}`,params).then((res)=>{ //数据链接成功
    if(res.data && res.data.description=="ok" ){
      return Promise.resolve(res.data.data)
    }else{
      return Promise.reject(res)
    } 
  }).catch((err)=>{ 
    return Promise.reject(err)
  })
}


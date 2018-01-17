import tpl from './mission.ejs'
import './mission-box.styl'
import $ from 'jquery'


function MissionBox(){
  return {
    tpl:tpl
  }
}
const MissionBoxInit = function(obj){ 
  let mbHtml = new MissionBox().tpl({
    actData:obj
  })  
  return mbHtml  
}


export default MissionBoxInit
import tpl from './layer.tpl'
//const tpl = require('./layer.tpl')
import './layer.styl'

function layer() {
  return {
    name:'layer',
    tpl: tpl
  }
}
module.exports = layer
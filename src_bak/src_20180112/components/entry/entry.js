import tpl from './entry.ejs'
import './entry.styl'

function Entry(){
  return {
    tpl:tpl
  }
}

// 数据
const entryData = [
  {
    name:'白菜价',
    img:require('./icon/icon_baicaijia.png'),
    link:'https://m.9kacha.com/channel/dist/index.html#/column/lowPrice'
  },
  {
    name:'热搜榜单',
    img:require('./icon/icon_heat.png'),
    link:'https://m.9kacha.com/channel/dist/index.html#/hotSearch'
  },
  {
    name:'电商热卖',
    img:require('./icon/icon_brand.png'),
    link:'https://m.9kacha.com/channel/dist/index.html#/hotSell'
  },
  {
    name:'大牌美酒',
    img:require('./icon/icon_dapaimeijiu.png'),
    link:'https://m.9kacha.com/channel/dist/index.html#/column/wineLevel'
  },
  {
    name:'红酒知识',
    img:require('./icon/icon_hongjiuzhishi.png'),
    link:'https://m.9kacha.com/channel/article.html'
  }
]

const entryCont = new Entry().tpl({
  entryData:entryData
})




module.exports = entryCont
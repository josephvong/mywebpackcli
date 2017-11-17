require('./common/style/index.styl');

console.log('222');
let result =[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

console.log(result)
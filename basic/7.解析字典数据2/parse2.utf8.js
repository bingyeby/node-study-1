const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");


let titleFile = path.join(__dirname, 'temp/fodict.bin')
titleFile = 'D:\\360极速浏览器下载\\fodict2_public-win32-j\\repo\\011.fjrwz-j\\fodict.bin'

try {
  fs.unlinkSync(__dirname + '/test.txt')
} catch (e) {
  console.log(`e`, e);
}
fs.readFile(titleFile, function (err, data) {
  if (err) {
    console.error(err);
  }
  else {
    let ecode = iconv.decode(data, 'utf8')// gb2312 utf8
    console.log(`ecode`, ecode);

    fs.writeFile(__dirname + '/test.txt', ecode, {flag: 'a'}, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    });
  }
});

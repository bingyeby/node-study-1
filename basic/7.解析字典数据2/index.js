const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");


const propertiesTransfer = require('./propertiesTransfer')
const binTransfer = require('./binTransfer')

let rootPath = 'D:\\360极速浏览器下载\\fodict2_public-win32-j\\repo\\'

try {
  fss.emptyDirSync(__dirname + '/result')
  fss.ensureFileSync(__dirname + '/result/test.json')
  fss.ensureFileSync(__dirname + '/result/dict.json')
} catch (e) {
  console.log(`e`, e);
}

// options 是可选的
glob("**/*.properties", {
  cwd: rootPath
}, async function (er, files) {
  let dictNameList = []

  for (const file of files) {
    // console.log(`file`, file);

    let props = await  propertiesTransfer(path.join(rootPath, file))

    console.log(file, props['name_zh_SC']);

    let binUrl = path.resolve(path.join(rootPath, file), '../fodict.bin')
    let binTransferR = await  binTransfer(binUrl)
    // console.log(`props`, binTransferR);

  }
  // fs.writeFile(__dirname + '/dict.json', _.map(dictNameList, (n, i) => {
  //   return JSON.stringify({name: n})
  // }).join('\n'), {flag: 'a'}, function (err) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('写入成功');
  //   }
  // });
})

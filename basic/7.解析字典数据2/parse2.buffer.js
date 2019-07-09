const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");

let titleFile = 'D:\\project.01\\node-study-1\\basic\\7.解析字典数据\\fodict.bin'

let content = new Buffer(0)

fs.readFile(titleFile, function (err, chunk) {
  if (err)
    return console.error(err);
  //合并Buffer
  content = Buffer.concat([content, chunk]);
  let entryTitleSize = content.slice(0, 4).readUIntBE(0, 4)
  console.log(` entrySize`, entryTitleSize);
  let titleList = _.map(Array(entryTitleSize), (n, i) => {
    let bug128 = content.slice(4 + 128 * i, 4 + 128 * (i + 1))
    let int1 = bug128.slice(0, 4).readUIntBE(0, 4)
    let int2 = bug128.slice(4, 8).readUIntBE(0, 4)
    let int3 = bug128.slice(8, 12).readUIntBE(0, 4)
    let int4 = bug128.slice(12, 16).readUIntBE(0, 4) // title的字节长度 (中文3 英文1)
    let titleStr = bug128.slice(16, 16 + int4).toString('utf-8')
    return titleStr
  })

  let entryIndexIndex = 4 + 128 * entryTitleSize // indexList 初始位置
  let entryContentSize = content.slice(entryIndexIndex, entryIndexIndex + 4).readUIntBE(0, 4) // indexList.size

  console.log(` entryContentSize`, entryContentSize);
  let contentIndex = entryIndexIndex + 4 * entryContentSize + 4 // contentList 初始位置
  let contentList = _.map(Array(entryContentSize), (n) => {
    let contentSize = content.slice(contentIndex, contentIndex + 4).readUIntBE(0, 4)
    contentIndex = contentIndex + 4
    let contentStr = content.slice(contentIndex, contentIndex + contentSize).toString('utf-8')
    contentIndex = contentIndex + contentSize
    return contentStr
  })
  console.log(titleList.slice(1), contentList);
});

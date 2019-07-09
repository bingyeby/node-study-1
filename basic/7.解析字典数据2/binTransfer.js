const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");

let binTransfer = async (binFileSrc) => {

  try {
    let content = new Buffer(0)
    let fileChunk = await fss.readFile(binFileSrc)
    content = Buffer.concat([content, fileChunk]);
    let entryTitleSize = content.slice(0, 4).readUIntBE(0, 4)

    console.log(` entrySize`, entryTitleSize);// 比 entryContentSize 多1 ,多出头部的 ROOT
    let titleList = _.map(Array(entryTitleSize), (n, i) => {
      let bug128 = content.slice(4 + 128 * i, 4 + 128 * (i + 1))
      let int1 = bug128.slice(0, 4).readUIntBE(0, 4)
      let int2 = bug128.slice(4, 8).readUIntBE(0, 4)
      let int3 = bug128.slice(8, 12).readUIntBE(0, 4)
      let int4 = bug128.slice(12, 16).readUIntBE(0, 4) // title的字节长度 (中文3 英文1)
      let titleStr = bug128.slice(16, 16 + int4).toString('utf-8')
      console.log(`titleStr`,titleStr);
      return titleStr
    })

    let entryIndexIndex = 4 + 128 * entryTitleSize // indexList 初始位置
    let entryContentSize = content.slice(entryIndexIndex, entryIndexIndex + 4).readUIntBE(0, 4) // indexList.size

    console.log(` entryContentSize`, entryContentSize);
    let contentIndex
    if (entryContentSize + 1 === entryTitleSize) {// 不存在子层
      contentIndex = entryIndexIndex + 4 * entryContentSize + 4 // contentList 初始位置
    } else { // 存在嵌套结构

      let test = true

      let xxIndex = entryIndexIndex
      let xxSize

      do {
        xxSize = content.slice(xxIndex, xxIndex + 4).readUIntBE(0, 4)
        xxIndex = xxIndex + 4
        let contentStr = content.slice(xxIndex, xxIndex + 100).toString('utf-8') // 取100个进行测试
        // console.log(`xxSize`, xxSize);
        // console.log(`contentStr`,contentStr);
        if (/[\u4e00-\u9fa5]/.test(contentStr)) {
          console.log(`中文`);
          test = false
          contentIndex = xxIndex - 4
        } else {
          xxIndex = xxIndex + xxSize * 4
        }
        // console.log(`contentIndex`,contentIndex);
      } while (test)

    }
    let contentList = _.map(Array(entryTitleSize - 1), (n, i) => {
      let contentSize = content.slice(contentIndex, contentIndex + 4).readUIntBE(0, 4)
      contentIndex = contentIndex + 4
      let contentStr = content.slice(contentIndex, contentIndex + contentSize).toString('utf-8')
      contentIndex = contentIndex + contentSize
      return contentStr
    })
    content = null
    return {
      titleList: titleList.slice(1),
      contentList,
    }
  } catch (e) {
    console.log(`e`, e);
  }
}

// binTransfer('D:\\360极速浏览器下载\\fodict2_public-win32-j\\repo\\001.dfb-j\\fodict.bin')
binTransfer('D:\\360极速浏览器下载\\fodict2_public-win32-j\\repo\\011.fjrwz-j\\fodict.bin')
module.exports = binTransfer

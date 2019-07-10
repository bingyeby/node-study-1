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
      // console.log(`titleStr`,titleStr);
      return titleStr
    })

    let entryIndexIndex = 4 + 128 * entryTitleSize // indexList 初始位置
    let entryContentSize = content.slice(entryIndexIndex, entryIndexIndex + 4).readUIntBE(0, 4) // indexList.size

    console.log(` entryContentSize`, entryContentSize);

    let contentIndex
    let folderSize
    if (entryContentSize + 1 === entryTitleSize) {// 不存在嵌套结构 一对一结构
      contentIndex = entryIndexIndex + 4 * entryContentSize + 4 // contentList 初始位置
      folderSize = 1 // ROOT 一个
    } else { // 存在嵌套结构 需要挑出空白文档
      let test = true
      let xxIndex = entryIndexIndex
      let xxSize
      let xxSizeList = []
      do {
        // x-----y------v====================
        xxSize = content.slice(xxIndex, xxIndex + 4).readUIntBE(0, 4)
        xxIndex = xxIndex + 4
        let contentStr = content.slice(xxIndex, xxIndex + 100).toString('utf-8') // 取100个进行测试
        // console.log(`contentStr`,contentStr);
        if (/[\u4e00-\u9fa5]/.test(contentStr)) {
          console.log(`中文`);
          test = false
          contentIndex = xxIndex - 4
        } else {
          xxSizeList.push(xxSize)
          xxIndex = xxIndex + xxSize * 4
        }
        // console.log(`contentIndex`,contentIndex);
      } while (test)
      console.log(`binTransfer xxSizeList`, JSON.stringify(xxSizeList, null, '  '));// 标题的index
      folderSize = _.size(xxSizeList)
    }

    // 获取最终数据
    let contentList = _.map(Array(entryTitleSize - folderSize), (n, i) => {
      let contentItemLength = content.slice(contentIndex, contentIndex + 4).readUIntBE(0, 4)
      contentIndex = contentIndex + 4
      let contentStr = content.slice(contentIndex, contentIndex + contentItemLength).toString('utf-8')
      contentIndex = contentIndex + contentItemLength
      return contentStr
    })
    content = null
    console.log(`binTransfer _.size(titleList.slice(folderSize))`, _.size(titleList.slice(folderSize)));
    console.log(`binTransfer _.size(contentList)`, _.size(contentList));
    return {
      titleList: titleList.slice(folderSize),
      contentList,
    }

  } catch (e) {
    console.log(`e`, e);
  }
}

binTransfer('D:\\project.01\\node-study-1\\basic\\7.解析字典数据2\\单层.bin')
binTransfer('D:\\project.01\\node-study-1\\basic\\7.解析字典数据2\\多层.bin')
module.exports = binTransfer

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");

let propertiesTransfer = async (binFileSrc) => {
  try {
    let fileChunk = await fss.readFile(binFileSrc)
    let ppList = fileChunk.toString('utf-8').split('\n')
    let returnV = {}
    _.filter(ppList, (n) => {
      return /\=/.test(n)
    }).forEach((n, i) => {
      let keyValue = n.split(/\=/)
      returnV [keyValue[0]] = keyValue[1]
    })
    return returnV
  } catch (e) {
    console.log(`e`, e);
  }
}

// propertiesTransfer('D:\\01\\practice\\2.node\\basic\\7.解析字典数据2\\repository.properties')
module.exports = propertiesTransfer

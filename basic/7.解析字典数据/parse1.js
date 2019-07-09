const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");


let rootPath = 'D:\\01\\practice\\小程序\\xcx-词典\\'

try {
  fs.unlinkSync(__dirname + '/test.json')
  fs.unlinkSync(__dirname + '/dict.json')
} catch (e) {
  console.log(`e`, e);
}

// options 是可选的
glob("**/*.ini", {
  cwd: rootPath
}, async function (er, files) {
  console.log(`files`, files);
  let dictNameList = []
  for (const file of files) {
    let iniFile = path.join(rootPath, file)
    let iniData = await fss.readFile(iniFile)
    let iniDataECode = iconv.decode(iniData, 'gb2312')
    let useInfo = {}
    _.each(iniDataECode.split('\n'), (n, i) => {
      n = n.replace(/\r/, '')
      if (/NAME=/.test(n)) {
        useInfo['name'] = n.split('=')[1]
        let matchDictName = (n.split('=')[1] || '').match(/《(\S+)》/)
        useInfo['dictName'] = matchDictName ? matchDictName[1] : n.split('=')[1]
        dictNameList.push(useInfo['dictName'])
      }
      if (/TITLEFILE=/.test(n)) {
        useInfo['titlePath'] = path.resolve(iniFile, '../' + n.split('=')[1])
      }
      if (/NRFILE=/.test(n)) {
        useInfo['nrPath'] = path.resolve(iniFile, '../' + n.split('=')[1])
      }
    })

    console.log(`-----------------------------------------`, 1111111111111);
    console.log(`useInfo`, useInfo.name);
    console.log(`useInfo`, useInfo.titlePath);

    let titleFileData = await fss.readFile(useInfo['titlePath'])
    let titleFileDataECode = iconv.decode(titleFileData, 'gb2312')
    let titleStrArr = titleFileDataECode.split(/\0/)
    let nrFileData = await fss.readFile(useInfo['nrPath'])
    let nrFileDataECode = iconv.decode(nrFileData, 'gb2312')
    let nrFileStrArr = nrFileDataECode.split(/\0/)

    if (titleStrArr.length === nrFileStrArr.length) {
      console.log(`校对：长度相等`);
    } else if (titleStrArr.length === nrFileStrArr.length + 1) {// 标题文件会多出一列 -> 标题
      console.log(`校对：标题文件多一条 已校对处理`,);
      titleStrArr.shift();
    } else {
      console.log(`校对：文件内容需要校对`, useInfo['titlePath'], useInfo['nrPath']);
    }
    console.log(`titleFileDataECode`, titleStrArr.length);
    console.log(`nrFileDataECode`, nrFileStrArr.length);


    // if (titleStrArr.length === nrFileStrArr.length) {
    //     let memoryJsonList = _.map(titleStrArr, (n, i) => {
    //         let memoryJson = {}
    //         memoryJson.dictName = useInfo.dictName
    //         memoryJson.keyword = n
    //         memoryJson.value = nrFileStrArr[i]
    //         return JSON.stringify(memoryJson)
    //     })
    //
    //     fs.writeFile(__dirname + '/test.txt', memoryJsonList.join('\n'), {flag: 'a'}, function (err) {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             console.log('写入成功');
    //         }
    //     });
    // }
  }
  fs.writeFile(__dirname + '/dict.json', _.map(dictNameList, (n, i) => {
    return JSON.stringify({name: n})
  }).join('\n'), {flag: 'a'}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
})


/*
*
.idx  文件缓存
.nr  解释 释义 内容
.tit 标题 单词
.ini  放置目录属性
* */
// let nrFile = 'D:\\02\\大文件\\1 大学学习资料-文史 经略 网文 1g\\经书之教\\词典\\F_FXCDTB_J\\F_FXCDTB_J.nr'
//
// fs.readFile(nrFile, function (err, data) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         let ecode = iconv.decode(data, 'gb2312')
//         console.log(`ecode`, ecode.split(/\0/).length);
//     }
// });
// let titleFile = 'D:\\02\\大文件\\1 大学学习资料-文史 经略 网文 1g\\经书之教\\词典\\F_FXCDTB_J\\F_FXCDTB_J.tit'
//
// fs.readFile(titleFile, function (err, data) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         let ecode = iconv.decode(data, 'gb2312')
//         console.log(`ecode`, ecode.split(/\0/).length);
//     }
// });

/*
* readStream
* */
// const buffers = [];
// readStream.on('data', function (buffer) {
//     console.log(`buffer`,buffer.toString('utf8'));
//     buffers.push(buffer);
// });
// readStream.on('end', function () {
//     const data = Buffer.from(buffers);
//     console.log(`.toString()`, data.toString('utf8'));
//     //...do your stuff...
//
//     // such as write to file:
//     // fs.writeFile('xxx.txt', data, function (err) {
//     //     // handle error, return response, etc...
//     // });
// });

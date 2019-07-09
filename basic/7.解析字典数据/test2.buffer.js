const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');// 解析编码
const glob = require('glob');// 解析编码

const _ = require('lodash')
const fss = require("fs-extra");


let titleFile = 'D:\\360极速浏览器下载\\fodict2_public-win32-j\\repo\\010.bkqszl-j\\fodict.bin'


fs.open(titleFile, 'r', function (err, fd) {
    if (err) {
        console.error(err);
        return;
    } else {
        var buffer = new Buffer(255);
        //每一个汉字utf8编码是3个字节，英文是1个字节
        fs.read(fd, buffer, 0, 100, null, function (err, bytesRead, buffer) {
            if (err) {
                throw err;
            } else {
                console.log(bytesRead);

                console.log(buffer.readUIntBE(0, 4));//华012345
                console.log(buffer.readUIntBE(0, 4));//华012345
                console.log(buffer.readUIntBE(0, 4));//华012345


                //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
                fs.read(fd, buffer, 0, 9, null, function (err, bytesRead, buffer) {
                    console.log(bytesRead);//9
                    console.log(buffer.slice(0, bytesRead).toString());
                    //6789
                    //人
                });
            }
        });
    }
});


var content = new Buffer(0)

fs.readFile(titleFile, function (err, chunk) {
    if (err)
        return console.error(err);
    //合并Buffer
    content = Buffer.concat([content, chunk]);




    let index = 0
    console.log(`content`, content);
    console.log(content.readUIntBE(index, 4));
    index += 4
    console.log(content.readUIntBE(index, 4));
    index += 4
    console.log(content.readUIntBE(index, 4));
    index += 4
    console.log(content.readUIntBE(index, 4));
    index += 4
    console.log(content.readUIntBE(index, 4));
    index += content.readUIntBE(index, 4)
    console.log(content.slice(index, index+4).toString('utf-8'));



    console.log(`---------`, content.slice(0,4).readUIntBE(0, 4));
    console.log(`---------`, content.slice(1,8).slice(3,7).readUIntBE(0, 4));
});

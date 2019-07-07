const fs = require('fs');
const path = require('path');
const readline = require('readline');



var iconv = require('iconv-lite');


let txt ='D:\\02\\大文件\\1 大学学习资料-文史 经略 网文 1g\\经书之教\\词典\\F_FXCDTB_J\\F_FXCDTB_J.nr'

let readStream = fs.createReadStream(txt, )


fs.readFile(txt,function(err,data){
    if(err){
        console.error(err);
    }
    else{
        let ecode = iconv.decode(data,'gb2312')
        console.log(`ecode`,ecode.split(/\0/));
    }
});

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

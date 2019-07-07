const glob = require('glob');// 解析编码


var fs = require('fs-extra');

let path = require('path')
let rootPath = 'D:\\01\\practice\\小程序\\xcx-image\\IMAGES\\'


glob("*", {
    cwd: rootPath
}, async function (er, files) {
    for (let file of files) {
        console.log(`file`, file);
        console.log(`path.resolve(rootPath, file.toLowerCase())`,path.resolve(rootPath, file.toLowerCase()));

        fs.rename(path.resolve(rootPath, file), path.resolve(rootPath, file.toLowerCase()), function (err) {
            if (err)
                console.log('error:' + err);
        });
    }
})


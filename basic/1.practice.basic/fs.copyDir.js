let fs = require('fs');
let path = require("path");
let mkdirp = require('mkdirp');

/*
* 复制一份
* */

/*
* 遍历读取文件列表
* */
function getAllPath(dir, filesList = []) {
    // 需要用到同步读取
    fs.readdirSync(dir).forEach(function (file) {
        let states = fs.statSync(dir + '/' + file);
        if (states.isDirectory()) {
            getAllPath(dir + '/' + file, filesList);
        } else {
            //创建一个对象保存信息
            let obj = {
                size: states.size,//文件大小，以字节为单位
                name: file,//文件名
                path: path.join(dir, file)//文件绝对路径
            };
            filesList.push(obj);
        }
    });
    return filesList
}


function copy(prePath, nextPath) {
    let fileInfoList = getAllPath(prePath);
    // console.log(fileInfoList);
    fileInfoList.forEach(function (fileInfo) {
        // fs.unlinkSync(file.path);  //删除
        let rs = fs.createReadStream(fileInfo.path);
        console.log(`pre`, fileInfo.path);

        let outPath = path.join(nextPath, fileInfo.path.replace(prePath, ''))
        console.log(`next`, outPath);

        mkdirp(path.dirname(outPath), (err) => {
            if (err) return
            let ws = fs.createWriteStream(outPath);
            rs.pipe(ws);
        })
    });
}


let prePath = "D:\\01\\practice\\2.node\\test.min";
let nextPath = 'D:\\11111111111';
copy(prePath, nextPath)
module.exports.copy = copy













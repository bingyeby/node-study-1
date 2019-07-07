var path = require("path");
var fs = require("fs");
var ll = console.log;
var dirCurrent = "F:\\新建文件夹 (2)\\新建文件夹"; // a b


var filePathAllNew = path.resolve(dirCurrent, `../${path.basename(dirCurrent)}-000`);
if (!fs.existsSync(filePathAllNew)) {
    fs.mkdirSync(filePathAllNew);
}

/**
 * 处理dirCurrent子路径
 * dirCurrent/a/ -> dealJpgInFile(a)
 * dirCurrent/b/ -> dealJpgInFile(b)
 */
fs.readdir(dirCurrent, function (err, dirs) {
    dirs.forEach(function (filePath) {
        var filePathAll = path.join(dirCurrent, filePath);
        fs.stat(filePathAll, function (err, stat) {
            if (stat.isDirectory()) {
                dealJpgInFile(filePathAll);
            }
        });
    });
});

// 排除的文件
let outerFileNameArr = ["3f4f6e03ca75ee62ab2402589452afa0", "525f75d8dc9cf69b63ca02e11685e633", "e476da82725a2942bb8b79e6ca59c841", "avatar", "avatar(1)"];
let isAllow = function (pathName) {
    let pathNameBase = path.basename(pathName, ".jpg");
    return !outerFileNameArr.some(n => n == pathNameBase);
}

function dealJpgInFile(moduleDirect) {
    var lastWordOfFilePath = moduleDirect.split("\\").pop();
    var moudleDirectNew = path.join(filePathAllNew, lastWordOfFilePath);
    if (!fs.existsSync(moudleDirectNew)) {
        fs.mkdirSync(moudleDirectNew);
        fs.readdir(moduleDirect, function (err, dirs) {
            dirs.forEach(function (fileOne) {
                var jpgPathOld = path.join(moduleDirect, fileOne);
                var jpgPathNew = path.join(moudleDirectNew, fileOne);
                fs.stat(jpgPathOld, function (err, stat) {
                    if (stat.isFile() && path.extname(jpgPathOld) == ".jpg" && isAllow(jpgPathOld)) {
                        ll(jpgPathOld);
                        var rs = fs.createReadStream(jpgPathOld);
                        var ws = fs.createWriteStream(jpgPathNew);
                        rs.pipe(ws);
                    }
                });
            });
        });
    }
}

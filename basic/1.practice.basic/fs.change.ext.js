var path = require("path");
var fs = require("fs");
var ll = console.log;
var dirCurrent = __dirname;

//改变文件的后缀
fs.readdir(dirCurrent, function (err, files) {
    ll(err);
    ll(files);
    files.forEach(function (name) {
        if (/\.txt/.test(name)) {
            var baseName = path.basename(name, '.txt');
            var rs = fs.createReadStream(baseName + ".txt");
            var ws = fs.createWriteStream(baseName + '.jpg');
            rs.pipe(ws);
        }
    });
});

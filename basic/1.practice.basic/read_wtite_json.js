/** Created by Administrator on 2016/9/6. */
var fs = require("fs"); //文件系统模块
var JSON=require("./JSON");
var ll=console.log;
var jsonObj = {
    "name": "syl",
    "value": [
        "123",
        "456"
    ]
};
function getType (obj) {
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
function getArrFromObj (obj) {
    for(var key in obj){
        var objTemp="";
        if(getType(obj[key])=="array"){
            return
        }else{
        }
    }
}

var filePath = "./temp/json.json";
var newFilePath = './temp/json2.json';
/*通过require读写一个json：json文件中不能有注释*/
//var json=require(filePath);
//console.log(json.name);

/*读写一个json文件*/
fs.exists(filePath, function (exists) {//判断文件是否存在
    if (exists) {//文件存在
        fs.readFile(filePath, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
            if (err) { console.error(err); return; }
            var parseJsonString = data.replace(/(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, "");
            /*将其中的注释去除*/
            var parseJson = JSON.parse(parseJsonString);
            /*todo:对json的处理*/
            parseJson.name = "新的json";
            fs.writeFile(newFilePath, JSON.stringify(parseJson), function (err) {
                if (err) throw err;
                ll('The "data to append" was appended to file!');
            });
        });
    } else { //文件不存在

    }
});

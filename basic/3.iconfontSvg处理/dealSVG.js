const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
let xml2js = require('xml2js')

let parser = new xml2js.Parser()


/*
* 1. 读取temp中的svg文件
* 2. 提取svg中的path   '<svg>...</svg>'.match(/(?<=\s)d\=\"[^\"]+\"/gi)  反向肯定
* 3. 将path数组放置到symbol中
* 4. 改变模板文件iconfont.temp.js，输出iconfont.temp.js
* */

let originPath = path.resolve(__dirname, 'temp')
fs.readdirAsync(originPath).then(function (data) {
    return data.filter(n => path.extname(n) == ".svg").map(n => path.resolve(originPath, n));
}).then(function (data) {
    let strList = data.map((svgPath, i) => {
        return fs.readFileAsync(svgPath, 'utf-8').then((data) => {
            return Promise.promisify(parser.parseString)(data).then((result) => {
                let pathStr = result.svg.path.map((n, i) => {
                    let attrObj = n['$']
                    return `<path d="${attrObj['d']}"></path>` // {fill , p-id}
                }).join('')
                let symbolStr = `<symbol id="${path.basename(svgPath, '.svg')}" viewBox="0 0 1024 1024">${pathStr}</symbol>`
                return symbolStr
            })
        })
    })
    Promise.all(strList).then((data, i) => {
        fs.readFileAsync(__dirname + '/temp/iconfont.temp.js', 'utf-8').then((result) => {
            let svgSymbolStr = result.replace('svgSymbol', `<svg>${data.join('')}</svg>`)
            /**
             * 判断文件是否存在
             *  不存在:走catch并创建文件 -> then
             *  存在:不走catch -> then
             * 
             * 调试:
             *  console.log('00', fs.existsSync(path.resolve(__dirname, 'dist')));
             */
            fs.accessAsync(path.resolve(__dirname, 'dist'), fs.constants.F_OK).catch(() => {
                return fs.mkdirAsync(path.resolve(__dirname, 'dist'))
            }).then(() => {
                fs.writeFileAsync(__dirname + '/dist/iconfont.js', svgSymbolStr, { flag: 'w' }).then(() => {
                    console.log(`svg convert success.`);
                })
            })
        })
    })
});

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


async function dealSvg() {

    let svgList = (await fs.readdirAsync(originPath)).filter(n => path.extname(n) == ".svg").map(n => path.resolve(originPath, n));

    let symbolListPromise = svgList.map(async (svgPath, i) => {
        let svgStringAll = await fs.readFileAsync(svgPath, 'utf-8') // 获取某个svg
        let pathAllStr = (await Promise.promisify(parser.parseString)(svgStringAll)).svg.path.map((n, i) => {
            return `<path d="${n['$']['d']}"></path>` // {fill , p-id}
        }).join('')
        let symbolStr = `<symbol id="${path.basename(svgPath, '.svg')}" viewBox="0 0 1024 1024">${pathAllStr}</symbol>`
        return symbolStr // 将svg中的path提取到symbol中
    })

    let symbolList = await Promise.all(symbolListPromise)

    let tempJs = await fs.readFileAsync(__dirname + '/temp/iconfont.temp.js', 'utf-8')

    tempJsWithSymbol = tempJs.replace('svgSymbol', `<svg>${symbolList.join('')}</svg>`)

    try {
        await fs.mkdirAsync(path.resolve(__dirname, 'dist2'))
        console.log('文件夹不存在,创建文件夹成功.');
    } catch (e) {
        console.log('文件夹存在,执行下一步');
    }
    try {
        await fs.writeFileAsync(__dirname + '/dist2/iconfont.js', tempJsWithSymbol, { flag: 'w' })
        console.log('success.')
    } catch (e) { }

}

dealSvg()

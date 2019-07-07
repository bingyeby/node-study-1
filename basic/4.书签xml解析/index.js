const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
let cheerio = require('cheerio')

/**
 *  { title: '\n            <![CDATA[#使用Jenkins配置SpringBoot的自动化构建-今日头条#]]>\n', 
 *      url: '\n            <!--[CDATA[#https://open.toutiao.com/a66047846 0ae93b&vivo_news_source=1#]]-->\n' }
 * 
 * https://www.toutiao.com/a6625756250732757518/
 * https://open.toutiao.com/a6625756250732757518/
 */
fs.readFileAsync('./bookmark.xml', 'utf-8').then(function (data) {
    return cheerio.load(data)
}).then((dom) => {
    //  处理数据
    let titleUrlList = []
    dom('item').each(function () {
        titleUrlList.push({
            title: (dom(this).find('title').text().match(/(?<=#)(.*)(?=#)/gi) || [])[0],
            url: (dom(this).find('url').html().match(/(?<=#)(.*)(?=#)/gi) || [])[0],
        })
    })
    // console.log('titleUrlList', titleUrlList);
    return titleUrlList
}).then((titleUrlList) => {
    //  输出为html
    let outer = cheerio.load('<html><html>')
    outer('body').append(titleUrlList.map((n) => {
        return `<div><a href="${n.url}" target="_blank">${n.title}</a></div>`
    }).join(''))
    // console.log('', outer.html());
    fs.writeFileAsync(__dirname + '/urlOut.html', outer.html(), { flag: 'w' }).then(() => {
        console.log(`success.`);
    })
})




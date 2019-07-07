/*
* https://github.com/derycktse/treer/blob/master/src/index.js
* */
const fs = require('fs')

/*
* 先展示文件
* */
function sortDir(arr) {
    let i = arr.length - 1
    while (i >= 0) {
        if (typeof arr[i] === 'object') {
            let obj = arr.splice(i, 1)
            arr.push(obj[0])
        }
        i--
    }
    return arr
}

const dirToJson = (path) => {
    let stats = fs.lstatSync(path),
        structure = {}

    if (stats.isDirectory()) {
        let dir = fs.readdirSync(path)

        // if (ignoreRegex) {
        //     dir = dir.filter((val) => {
        //         return !ignoreRegex.test(val)
        //     })
        // }
        dir = dir.map((child) => {
            let childStats = fs.lstatSync(path + '/' + child)
            return childStats.isDirectory() ? dirToJson(path + '/' + child) : child
        })
        let dirName = path.replace(/.*\/(?!$)/g, '')
        structure[dirName] = dir.sort((a, b) => {
            return (typeof a) === 'object' ? 1 : -1
        })
    } else {
        let fileName = path.replace(/.*\/(?!$)/g, '')
        return fileName
    }
    return structure
}

const drawDirTree = (data, placeholder) => {
    const characters = {
        border: '|',
        contain: '├',
        line: '─',
        last: '└'
    }
    let {
        border,
        contain,
        line,
        last
    } = characters
    for (let i in data) {
        if (typeof data[i] === 'string') {
            // console.log(placeholder + data[i])
            outputString += '\n' + placeholder + data[i]
        } else if (Array.isArray(data[i])) {
            // console.log(placeholder + i)
            outputString += '\n' + placeholder + i
            placeholder = placeholder.replace(new RegExp(`${contain}`, "g"), border)
            placeholder = placeholder.replace(new RegExp(`${line}`, "g"), " ")
            placeholder = placeholder + Array(Math.ceil(i.length / 2)).join(" ") + contain + line
            placeholder = placeholder.replace(new RegExp("^ +", 'g'), "")
            data[i].forEach((val, idx, arr) => {
                let pl = placeholder
                //if the idx is the last one, change the character
                if (idx === (arr.length - 1)) {
                    let regex = new RegExp(`${contain}${line}$`, "g")
                    pl = placeholder.replace(regex, last)
                }
                if (typeof val === 'string') {
                    // console.log(pl + val)
                    outputString += '\n' + pl + val
                } else {
                    let pl = placeholder
                    drawDirTree(val, pl)

                }
            })
        }
    }
}


// const result = dirToJson(process.cwd())
let result = dirToJson('D:\\01\\practice\\2.node\\test.min')

// console.log(`result\n`, JSON.stringify(result, null, ' '));

// fs.writeFile('test.sync.json', JSON.stringify(result, null, ' '))

let outputString = ''

drawDirTree(result, "")
outputString = outputString.replace(/^\n/, '')

console.log(outputString)

// fs.writeFile('test.sync.text', outputString);

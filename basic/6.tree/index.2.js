const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

class Node {
    constructor(name, fullPath) {
        this.name = name
        this.fullPath = fullPath
        this.parent = ''
        this.child = []
        this.type = ''
        this.id = uuid.v4()
    }
}

function read(dir, nodeMiddle, done) {
    fs.readdir(dir, (err, entries) => {
        if (err) return
        let count = entries.length
        count === 0 && done()
        entries.forEach(name => {
            let fullPath = path.join(dir, name)
            console.log(`fpath`, fullPath);
            fs.lstat(fullPath, (err, stats) => {
                if (err) return
                let node = new Node(name, fullPath)
                map.set(node.id, node)
                if (stats.isFile()) {
                    node.type = 'file'
                    nodeMiddle.child.push(node)
                    count--
                } else if (stats.isDirectory()) {
                    node.type = 'dir'
                    nodeMiddle.child.push(node)
                    read(fullPath, node, () => {
                        count--
                        count === 0 && done()
                    }, done)
                } else {
                    node.type = '--'
                    nodeMiddle.child.push(node)
                    count--
                }
                count === 0 && done()
            })
        })
    })
}

let absolutePath = process.cwd()
let map = new Map()
let nodeG = new Node(path.basename(absolutePath), absolutePath)
read(absolutePath, nodeG, () => {
    console.log(`map`, map.size);
    fs.writeFile('test.2.json', JSON.stringify(nodeG, null, ' '))
})

/*
* https://blog.csdn.net/u010576399/article/details/70332583
* */
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

class Node {
    constructor(name, type, parent) {
        this.name = name
        this.parent = parent
        this.child = []
        this.type = type
        this.id = uuid.v4()
    }
}


//这就是一个 visitor
function visit(dir, dirContext, func, done) {
    fs.readdir(dir, (err, entries) => {
        if (err || entries.length === 0) return done()
        let count = entries.length
        entries.forEach(entry => {
            func(dir, dirContext, entry, (entryContext) => {
                if (entryContext) {
                    visit(path.join(dir, entry), entryContext, func, () => {
                        count--
                        if (count === 0) done()
                    })
                }
                else {
                    count--
                    if (count === 0) done()
                }
            })
        })
    })
}

let map = new Map()
let u = false
const clean = (dir, dirContext, entry, callback) => {
    let fpath = path.join(dir, entry)

    fs.lstat(fpath, (err, stats) => {
        if (err) return callback()
        if (stats.isFile()) {
            let node = new Node(entry, 'file')
            map.set(node.id, node)
            dirContext.child.push(node)
            callback()
        } else if (stats.isDirectory()) {
            let node = new Node(entry, 'folder')
            map.set(node.id, node)
            dirContext.child.push(node)
            callback(node)
        } else {
            let node = new Node(entry, 'unknown')
            u = node.id
            map.set(node.id, node)
            dirContext.child.push(node)
            callback(node)
        }
    })
}

let n = new Node('usr', 'folder')
map.set(n.id, n)

visit('../', n, clean, () => {
    fs.writeFile('test.json', JSON.stringify(n, null, ' '))
    console.log('----------------------------', map.size)
    console.log(map.get(n.id))
})

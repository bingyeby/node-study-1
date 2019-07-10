读取平铺层级结构数据
9-------8-----7----6---5---18---17----
```js
[
  {
    size:9,
    child:[
        {
          size:8,
          child:[
              {
                size:7,
                child:[
                    {
                      size:6,
                      child:[
                        
                      ]
                    },
                    {
                      size:5,
                      child:[
                        
                      ]
                    },
                ]
              },
          ]
        },
        {
          size:18,
          child:[
              {
                size:17,
                child:[
                    {
                      size:16,
                      child:[
                        
                      ]
                    },
                    {
                      size:15,
                      child:[
                        
                      ]
                    },
                ]
              },
          ]
        },
    ]
  },
  {},{},{},{},{},{}
]
```
```js

      let faChildInfo = []
      let levelIndex = 0
      let index0 = 0
      let index1 = 0
      let index2 = 0
      let index3 = 0
      _.each(xxSizeList, (n, i) => {
        if (levelIndex === 0) {
          faChildInfo.push({size: n, child: []})
          levelIndex = levelIndex + 1
        } else if (levelIndex === 1) {
          faChildInfo[index1].child.push({
            size: 24,
            child: []
          })
          if (_.size(faChildInfo[index1].child) === faChildInfo[index1].size) {
            levelIndex = levelIndex - 1
            index1++
          } else {
            levelIndex = levelIndex + 1
          }
        } else if (levelIndex === 2) {
          faChildInfo[index1].child[index2].child.push({
            size: n,
            child: []
          })
          if (_.size(faChildInfo[index1].child[index2].child) === faChildInfo[index1].child[index2].size) {
            levelIndex = levelIndex - 1
            index2++
          } else {
            levelIndex = levelIndex + 1
          }
        } else if (levelIndex === 3) {
          faChildInfo[index1].child[index2].child[index3].child.push({
            size: n,
            child: []
          })
          if (_.size(faChildInfo[index1].child[index2].child[index3].child) === faChildInfo[index1].child[index2].child[index3].size) {
            levelIndex = levelIndex - 1
            index3++
          }
        }
      })
      console.log(`binTransfer faChildInfo`, JSON.stringify(faChildInfo, null, '\t'));
```

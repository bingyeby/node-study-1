var file = require("fs-extra");

file.walk('D:\\01\\practice\\2.node\\basic\\1.practice.basic', (err, str) => {
    console.log(`str`, str);
})

#!/usr/bin/env node
var program = require('commander');

/*定义帮助文档*/
program
    .allowUnknownOption()
    .version('0.0.1')
    .option('-r, --resume', '简历')
    .option('-l, --language <lang>', '这个语言是我擅长的语言。')
    //.option('-l,--database [db]', '这个语言是我擅长的语言。')
    .parse(process.argv);

/*node test -r*/
if (program.resume) console.log('简历 - 这个是我的简历！');
/*node test -l js*/
if (program.language) console.log('language: 我擅长的语言：' + program.language);
/*node test -l js*/
if (program.database) console.log('db: 我擅长的语言：' + program.database);
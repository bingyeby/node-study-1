//全局变量
var ll=console.log;

ll("__filename:\t"+__dirname);
//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。
//如果在模块中，返回的值是模块文件的路径。
//F:\HTML\test\testnode\test\Global .js


ll("__dirname:\t"+__dirname);
//__dirname 表示当前执行脚本所在的目录。
//F:\HTML\test\testnode\test

function aa(){
	console.trace("函数运行路径...");
}
//aa()
//trace:路径追踪
//Trace: 函数运行路径...
//    at aa (F:\HTML\test\testnode\test\Global .js:15:10)
//    at Object.<anonymous> (F:\HTML\test\testnode\test\Global .js:17:1)
//    at Module._compile (module.js:435:26)
//    at Object.Module._extensions..js (module.js:442:10)
//    at Module.load (module.js:356:32)
//    at Function.Module._load (module.js:311:12)
//    at Function.Module.runMain (module.js:467:10)
//    at startup (node.js:136:18)
//    at node.js:963:3


//ll(process)
//process 是一个全局变量，即 global 对象的属性。
//它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
//通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。



process.stdout.write("/*输出到终端*/Hello World!" + "\n");
//Hello World!


ll("node.exe的执行路径\t"+process.execPath);
//C:\Program Files\nodejs\node.exe

console.log("平台信息:\t"+process.platform);
//win32

console.log('node.exe的版本信息:\t' + process.version);
//v4.2.2

console.log('当前目录:\t' + process.cwd());
//当前目录:
//F:\HTML\test\testnode\test

console.log(process.memoryUsage());
//输出内存使用情况
//{ rss: 14811136, heapTotal: 6081920, heapUsed: 3004116 }



/*…………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………[  Buffer  ]…………*/

ll(new Buffer(1));//<Buffer 00>
ll(new Buffer(3));//<Buffer 00 00 00>
//创建长度为 x 字节的 Buffer 实例

ll(new Buffer([10, 20, 30, 40, 50]));//<Buffer 0a 14 1e 28 32>
//通过给定的数组创建 Buffer 实例：

ll(new Buffer("www.runoob.com", "utf-8"));//<Buffer 77 77 77 2e 72 75 6e 6f 6f 62 2e 63 6f 6d>
ll(new Buffer("www.runoob.com", "ascii"));//<Buffer 77 77 77 2e 72 75 6e 6f 6f 62 2e 63 6f 6d>
//通过一个字符串来创建 Buffer 实例：
//utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。


buf = new Buffer(100);
for (var i = 0; i < 26; i++) {
	buf[i] = i;
}

ll( buf.toString('ascii'));       //输出: abcdefghijklmnopqrstuvwxyz
ll( buf.toString('ascii',0,5));   //输出: abcde
ll( buf.toString('utf8',0,5));    //输出: abcde
ll( buf.toString(undefined,0,5)); //使用 'utf8' 编码, 并输出: abcde














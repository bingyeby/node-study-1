var prompt = require('./prompt.js');
var svnInfo = {};


function svnUsername() {
    prompt.readLine('请输入svn帐号：',function(data){
        // 返回false则表示数据不合法，需要重新输入
        if(!data) return false;
        svnInfo.user = data;
        //console.log(data);
        // 数据合法，返回true
        return true;
    },false);
}

function svnPassword() {
    prompt.readLine('请输入svn密码：',function(data){
        // 返回false则表示数据不合法，需要重新输入
        if(!data) return false;
        svnInfo.pass = data;
        console.log("----------");
        // 数据合法，返回true
        return true;
    },true);
}

prompt.startStepByStep({
    svnUser:svnUsername,
    svnPass:svnPassword
});



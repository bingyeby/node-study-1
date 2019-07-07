/**
 * Created by Administrator on 2016/8/13.
 */

var student=require("./student");
var teacher=require("./teacher");

teacher.add("teacher one");
teacher.add("teacher two");

function add(teachername,students){
    teacher.add(teachername);
    students.forEach(function(n,i){
        student.add(n);
    })
}

exports.add=add;
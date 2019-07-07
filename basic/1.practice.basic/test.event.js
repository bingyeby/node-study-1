var events=require("events")
var life = new events.EventEmitter();
life.on("eventName", function (value) {
    console.log("name:::" + value);
});
life.on("eventName", function (value) {
    console.log("name:::" + value);
});
life.on("eventName", function (value) {
    console.log("name:::" + value);
});
life.on("eventName", function (value) {
    console.log("name:::" + value);
});
life.emit("eventName", "hello ");
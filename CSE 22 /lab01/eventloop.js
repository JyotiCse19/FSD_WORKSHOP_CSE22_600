const { useCallback } = require("react");

console.log("This is the starting point of my code");

process.nextTick(() => {
    console.log("This is process.nextTick");
});

setTimeout(() => {
    console.log("This is the first timeout function");
}, 5000);
setTimeout(() => {
    console.log("This is the second timeout function");
}, 2000);
setImmediate(() => {
    console.log("This is run after 0 miliseconds");
    
},0);
console.log("This is the end point of my code");

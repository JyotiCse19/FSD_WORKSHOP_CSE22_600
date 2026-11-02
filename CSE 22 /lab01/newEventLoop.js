const { useCallback } = require("react");

console.log("This is the starting point of my code");

process.nextTick(() => {
    console.log("This is process.nextTick of my code");
});

setTimeout(() => {
    console.log("This is first timeout function");
}, 5000);

setTimeout(() => {
    console.log("This is second timeout function");
}, 2000);

setTimeout(() => {
    console.log("This statement will run after 0 seconds");
}, 0);

new Promise((resolve, reject) => {
    let success = false;

    if (success) {
        resolve("Data loaded successfully");
    } else {
        reject("Something went wrong");
    }
})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

process.nextTick(() => {
    console.log("This is process.nextTick code");
});

console.log("This is the end point of my code");
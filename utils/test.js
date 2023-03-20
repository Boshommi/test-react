const fs = require("fs");

let a = fs.readFileSync("./WATCHES.json");

console.log(JSON.parse(a).length);

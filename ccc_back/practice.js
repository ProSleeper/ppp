const fs = require("fs");

const options = {
    key : fs.readFileSync(__dirname + "/fake-keys/key.pem", { encoding: "utf8", flag: "r" }),
    cert : fs.readFileSync(__dirname + "/fake-keys/cert.pem", { encoding: "utf8", flag: "r" }),
};

console.log(options.key);

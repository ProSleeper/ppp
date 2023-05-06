const os = require("os");

console.log(os.platform().toLocaleLowerCase());

os.platform().toLocaleLowerCase() !== "win32"
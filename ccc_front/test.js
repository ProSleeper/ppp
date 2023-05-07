const isWindows = true;

const reqUrl = (isWindows && "http://manyo.hopto.org/add_url") || "http://127.0.0.1:4000/add_url";

// console.log(reqUrl);
console.log(isWindows && `isWindows: ${isWindows}`);

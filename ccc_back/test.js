const { spawn } = require("child_process");
const iconv = require("iconv-lite");
const child = spawn("./database/CCC_DB", ["ip", "port"]);

child.stdout.on("data", (data) => {
    console.log(`stdout: ${iconv.decode(data, "euc-kr")}`);
});

child.stderr.on("data", (data) => {
    iconv.console.error(`stderr: ${iconv.decode(data, "euc-kr")}`);
});

// child.stdin.write("hello\n");
// child.stdin.end();

child.on("exit", (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
});

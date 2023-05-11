const { spawn } = require("child_process");
const iconv = require("iconv-lite");

const db_server = "localhost";  // where the mysql database is
const user = "u0_a177";      // the root user of mysql
const pwd = "suzi123";  // the password of the root user in mysql
const db_name = "ccc";      // the databse to pick

const child = spawn("./database/CCC_DB", [db_server, user, pwd, db_name]);

const behavior = {
    insert: "INSERT",
    update: "UPDATE",
    delete: "DELETE",
    select: "SELECT"
}
Object.freeze(behavior);

const data = (behavior, brand , url) => {
    return {
        behavior: behavior,
        data: {
            brand: brand,
            url: url
        }
    };
}

// child.stdout.on("data", (data) => {
//     console.log(`stdout: ${iconv.decode(data, "euc-kr")}`);
// });
child.stdout.on("data", (data) => {
    const decodedData = iconv.decode(data, "utf8");
    try {
         // Select 결과 출력
        const response_data = JSON.parse(decodedData);
        console.log(response_data);
    } catch (error) {
        if (error.name === "SyntaxError") {
            // console.log("신택스 에러")
            console.log(decodedData);
	    return; 
	}
	console.log(error);
    }
});

child.stderr.on("data", (data) => {
    iconv.console.error(`stderr: ${iconv.decode(data, "utf8")}`);
});

//const request_data = data(behavior.insert, "ums", "ftp");
const request_data = data(behavior.update, "ddudang", "http");
//const request_data = data(behavior.delete, "", "http");
//const request_data = data(behavior.select, "", "");


// console.log(send_data);
const WriteTo = (json_data) => {
    child.stdin.write(`${json_data}\n`);
    // console.log("node_to_cpp_print: " + json_data);
}

// WriteTo(JSON.stringify(request_data));


child.on("exit", (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
});

// child.kill("SIGTERM");

module.exports = {
    WriteTo
};

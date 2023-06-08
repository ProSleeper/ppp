const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "u0_a177",
    password: "suzi123",
    database: "ccc",
    // debug: true,
});

connection.connect(function (err) {
    if (err) {
        console.error("Error connecting to MariaDB: " + err.stack);
        return;
    }
    // console.log("Connected to MariaDB as id " + connection.threadId);
});
//db접속 종료인데 실제 서버를 운영할때는 필요 없다고 봐야겠다.
// connection.end();

// connection.query(`select * from daily_data limit 1`, function (error, rows, fields) {
//     if (error) reject(error);
//     console.log(rows);
// });

module.exports = {
    connection,
};

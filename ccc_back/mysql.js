const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "u0_a177",
    password: "suzi123",
    database: "ccc",
});

connection.connect(function (err) {
    if (err) {
        console.error("Error connecting to MariaDB: " + err.stack);
        return;
    }

    // console.log("Connected to MariaDB as id " + connection.threadId);
});

//데이터 추가
const insert_data = (web_platform, url) => {
    connection.query(
        `insert into product_url(web_platform, url) values('${web_platform}', '${url}')`,
        function (error, rows, fields) {
            if (error) throw error;
            console.log("The solution is: ", rows);
        }
    );
};

// 데이터 수정
const update_data = (web_platform, url) => {
    connection.query(
        `update product_url set web_platform = '${web_platform}', url = '${url}' where url='${url}'`,
        function (error, rows, fields) {
            if (error) throw error;
            console.log("The solution is: ", rows);
        }
    );
};

// 데이터 삭제
const delete_data = (url) => {
    connection.query(`delete from product_url where url='${url}'`, function (error, rows, fields) {
        if (error) throw error;
        console.log("The solution is: ", rows);
    });
};

// 전체 데이터 조회
const select_data = () => {
    connection.query("SELECT * FROM product_url", function (error, rows, fields) {
        if (error) throw error;
        console.log("The solution is: ", rows);
    });
};

// // 예시 쿼리 실행
// connection.query(
//     'insert into product_url(web_platform, url) values("spao", "http")',
//     function (error, rows, fields) {
//         if (error) throw error;
//         console.log("The solution is: ", rows);
//         console.log("The solution is: ", fields);
//     }
// );

// 예시 쿼리 실행
// connection.query("SELECT * FROM product_url", function (error, rows, fields) {
//     if (error) throw error;
//     console.log("The solution is: ", rows);
//     console.log("The solution is: ", fields);
// });

//db접속 종료인데 실제 서버를 운영할때는 필요 없다고 봐야겠다.
// connection.end();

module.exports = {
    insert_data,
    update_data,
    delete_data,
    select_data,
};

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

const test_query_obj = {
    behavior: "INSERT",
    data: {
        brand: "MUSINSA",
        url: "http://musinsa.com",
    },
};

const send_query = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const check_query = async (query) => {
    try {
        await send_query(query);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// child.stdout.on("data", (data) => {
//     const decodedData = iconv.decode(data, "utf8");
//     try {
//          // Select 결과 출력
//         const response_data = JSON.parse(decodedData);
//         console.log(response_data);
//     } catch (error) {
//         if (error.name === "SyntaxError") {
//             // console.log("신택스 에러")
//             console.log(decodedData);
// 	    return;
// 	}
// 	console.log(error);
//     }
// });

const insert_data = (data) => {
    return check_query(`insert into product_url(brand, url) values('${data.brand}', '${data.url}')`);
};

// const insert_data = async (data) => {
//     try {
//         const result = await send_query(`insert into product_url(brand, url) values('${data.brand}', '${data.url}')`);
//         console.log(result);
//         return true;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };

// const send_query = async (query) => {
//     connection.query(query, function (error, rows, fields) {
//         if (error) throw error;
//         // console.log("query success");
//         console.log("inner");
//         return true;
//     });
//     console.log("outer");
//     return false;
// };

// //데이터 추가
// const insert_data = async (data) => {
//     return await send_query(`insert into product_url(brand, url) values('${data.brand}', '${data.url}')`);
// };

// 데이터 수정

const update_data = (data) => {
    return check_query(`update product_url set brand = '${data.brand}' where url='${data.url}'`);
};

// 데이터 삭제
const delete_data = (data) => {
    return check_query(`delete from product_url where url='${data.url}'`);
};

// 전체 데이터 조회
const select_data = async (url = "") => {
    let find_key = "";
    if (url !== "") {
        find_key = `where url = '${url}'`;
    }
    try {
        const result = await send_query("SELECT * FROM product_url " + find_key);
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return null;
    }
};

const query_exec = async (query_obj) => {
    if (query_obj.behavior == "INSERT") {
        insert_data(query_obj.data) && console.log("Insert Success");
    } else if (query_obj.behavior == "UPDATE") {
        update_data(query_obj.data) && console.log("Update Success");
    } else if (query_obj.behavior == "DELETE") {
        delete_data(query_obj.data) && console.log("Delete Success");
    } else if (query_obj.behavior == "SELECT") {
        return await select_data(query_obj.data.url);
    }
    return null;
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
    query_exec,
};

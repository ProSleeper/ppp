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

const send_query = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const insert_data = async (data) => {
    return await send_query(
        `insert into daily_data(brand, title, url, today, time${data.curr_time}_price) values('${data.brand}', '${data.title}', '${data.url}', now(), ${data.price}) on duplicate key update brand = '${data.brand}', title = '${data.title}', today = now(), time${data.curr_time}_price = ${data.price}`
    );
};

const insert_prev_data = async () => {
    return await send_query(
        `INSERT INTO prev_daily_data SELECT * FROM daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`
    );
};
// 데이터 수정 upsert 문법으로 필요하지 않을 듯.
// const update_data = (data) => {
//     return send_query(`update product_url set brand = '${data.brand}' where url='${data.url}'`);
// };

// 데이터 삭제
const delete_data = async (url) => {
    // return send_query(`delete from daily_data where url='${url}'`);
    return await send_query(`delete from daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`);
};
// const delete_data = (data) => {
//     return send_query(`delete from daily_data where url='${data.url}'`);
// };

// 전체 데이터 조회
const select_data = async (url = "") => {
    let find_key = "";
    if (url !== "") {
        find_key = `where url = '${url}'`;
    }
    try {
        const result = await send_query("SELECT * FROM daily_data " + find_key);
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 전체 데이터 조회
const read_total_url = async () => {
    try {
        const result = await send_query("SELECT * FROM url_data ");
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 이전 컬럼과 현재 컬럼 비교.
const compare_price = async (url, curr_time) => {
    const prev_time = curr_time - 1;
    try {
        const result = await send_query(
            // `SELECT time${prev_time}_price > time${curr_time}_price as result FROM daily_data where url = '${url}'`
            `SELECT CASE WHEN time${prev_time}_price > time${curr_time}_price THEN time${prev_time}_price ELSE 0 END as result FROM daily_data where url = '${url}'`
        );
        return result[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 이벤트 발생 시 저장
const insert_sale_data = async (brand, title, url, sale_price, prev_price) => {
    try {
        await send_query(
            `insert into sale_data(brand, title, url, change_date, sale_price, prev_price) values('${brand}', '${title}', '${url}', now(), ${sale_price}, ${prev_price})`
        );
    } catch (error) {
        console.error(error);
        return null;
    }
};

const insert_monthly_data = async (data) => {
    return await send_query(
        `insert into monthly_data(brand, title, url, month, day${data.today}_price) values('${data.brand}', '${data.title}', '${data.url}', now(), ${data.min_value}) on duplicate key update brand = '${data.brand}', title = '${data.title}', month = now(), day${data.today}_price = ${data.min_value}`
    );
};

// NEXT DAY
const new_day_get_old_data = async () => {
    try {
        let least_query = "least(";
        for (let index = 0; index < 24; index++) {
            least_query += `ifnull(time${index}_price, 99999999)`;
            if (index > 22) {
                least_query += ") as min_value";
            } else {
                least_query += ",";
            }
        }
        const result = await send_query(
            `SELECT brand, title, url, DATE_FORMAT(today, '%d') as today, ${least_query} FROM daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// SELECT brand, title, url, DATE_FORMAT(today, '%d') as today FROM daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL - 1 DAY);

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

//db접속 종료인데 실제 서버를 운영할때는 필요 없다고 봐야겠다.
// connection.end();

module.exports = {
    query_exec,
    read_total_url,
    compare_price,
    insert_sale_data,
    insert_monthly_data,
    insert_prev_data,
    new_day_get_old_data,
    delete_data,
};

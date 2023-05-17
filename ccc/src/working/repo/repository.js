const { connection } = require("./mysql_connector.js");

/**
 * save(insert&update)
 * find(select where)
 * findAll(select)
 * remove(delete)
 */

// const save = (data_obj) => {
//     return new Promise((resolve, reject) => {
//         connection.query("INSERT INTO url_data set ? ?", data_obj, function (error, rows, fields) {
//             if (error) reject(error);
//             console.log(rows);
//         });
//     });
// };

const save = (data_obj) => {
    return new Promise((resolve, reject) => {
        const primary_key = data_obj.data.primary_key;
        const update_data = { ...data_obj.data };

        delete update_data[`${primary_key}`];
        delete update_data["primary_key"];
        delete data_obj.data["primary_key"];

        connection.query(
            `insert into ${data_obj.constructor.name} set ? on duplicate key update ?`,
            [data_obj.data, update_data],
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("save ok");
            }
        );
    });
};

const insert_data = async (data) => {
    return await send_query(
        `insert into daily_data(brand, title, url, today, time${data.curr_time}_price) values('${data.brand}', '${data.title}', '${data.url}', now(), ${data.price}) on duplicate key update brand = '${data.brand}', title = '${data.title}', today = now(), time${data.curr_time}_price = ${data.price}`
    );
};

const remove = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO url_data set ?", data, function (error, rows, fields) {
            if (error) reject(error);
            console.log(rows);
        });
    });
};

const findAll = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO url_data set ?", data, function (error, rows, fields) {
            if (error) reject(error);
            console.log(rows);
        });
    });
};

const find = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO url_data set ?", data, function (error, rows, fields) {
            if (error) reject(error);
            console.log(rows);
        });
    });
};

//객체를 배열로 변환해서 넣는 방법.
//근데 사실 별 의미는 없다 그냥 배열로 넣는 법하고 똑같은데 객체를 배열로 만들어서 넣을 뿐이다.
// const users = [
//     {
//         brand: "1123",
//         url: "456456",
//     },
//     {
//         brand: "4568",
//         url: "adsfax",
//     },
//     {
//         brand: "asdfaf",
//         url: "asdfz",
//     },
// ];

// const query = "INSERT INTO url_data (brand, url) VALUES ?";

// const values = users.map((user) => [user.brand, user.url]);

// connection.query(query, [values], (error, results) => {
//     if (error) throw error;
//     console.log("Users inserted:", results.affectedRows);
// });

module.exports = {
    save,
    remove,
    find,
    findAll,
};

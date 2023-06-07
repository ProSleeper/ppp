const { connection } = require("./mysql_connector.js");

/**
 * save(insert&update)
 * find(select where)
 * findAll(select)
 * remove(delete)
 */

const save = (data_obj) => {
    return new Promise((resolve, reject) => {
        const primary_key = data_obj.data.primary_key;
        const update_data = { ...data_obj.data };
        for (let index = 0; index < 23; index++) {
            if (update_data[`time${index}_price`] === null) {
                delete update_data[`time${index}_price`];
            }
        }
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

const remove = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `delete from ${data_obj.constructor.name} where ?`,
            { url: data_obj.data.url },
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("delete ok");
            }
        );
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from daily_data", function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const findByUrl = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from daily_data where url = '${url}'`, function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

// 0시가 되면 1시간 전인 어제의 23시 데이터와 비교해야한다.
// 그래서 하루의 최저 가격을 찾는 것보다 먼저 23시 데이터를 가져와서 배열에 저장하자.




// 이전 컬럼과 현재 컬럼 비교.
const findByYesterdayPriceCompareTodayPrice = async (curr_time) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `select dt.brand, dt.title, dt.url, CONCAT(dt.today, ' ${curr_time}:00:00') as change_date, dt.time0_price as sale_price, dy.time23_price as prev_price from daily_data dy inner join daily_data dt on dy.url = dt.url where DATE(dy.today) = CURDATE() - INTERVAL 1 DAY and DATE(dt.today) = CURDATE() and dy.time23_price > dt.time0_price`,
                function (error, rows, fields) {
                    if (error) reject(error);
                    resolve(rows);
                }
            );
        } catch (error) {
            console.error(error);
        }
    })
};

// NEXT DAY
const findByMinPrice = () => {
    return new Promise((resolve, reject) => {
        try {
            let least_query = "least(";
            for (let index = 0; index < 24; index++) {
                least_query += `ifnull(time${index}_price, 99999999)`;
                if (index > 22) {
                    least_query += ") as price";
                } else {
                    least_query += ",";
                }
            }
            connection.query(
                `SELECT brand, title, url, today, ${least_query} FROM daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`,
                function (error, rows, fields) {
                    if (error) reject(error);
                    resolve(rows);
                }
            );
        } catch (error) {
            console.error(error);
        }
    });
};

const findByYesterday = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`,
                function (error, rows, fields) {
                    if (error) reject(error);
                    resolve(rows);
                }
            );
        } catch (error) {
            console.error(error);
        }
    });
};

// 이전 컬럼과 현재 컬럼 비교.
const findBySale = async (curr_time) => {
    return new Promise((resolve, reject) => {
        const prev_time = curr_time - 1;
        try {
            connection.query(
                `select brand, title, url, CONCAT(today, ' ${curr_time}:00:00') as change_date, time${curr_time}_price as sale_price, time${prev_time}_price as prev_price from daily_data where time${prev_time}_price > time${curr_time}_price`,
                function (error, rows, fields) {
                    if (error) reject(error);
                    resolve(rows);
                }
            );
        } catch (error) {
            console.error(error);
        }
    })
};

const remove_old_data = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `delete from daily_data WHERE today = DATE_ADD(CURDATE(), INTERVAL -1 DAY)`,
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("delete ok");
            }
        );
    });
};

module.exports = {
    save,
    remove,
    remove_old_data,
    findByUrl,
    findAll,
    findByMinPrice,
    findByYesterday,
    findBySale,
    findByYesterdayPriceCompareTodayPrice,
};

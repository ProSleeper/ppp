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

const updateLowestPrice = (url, price) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `update url_data set lowest_price = ? where (lowest_price = 0 or lowest_price > ?) and url = ?`,
            [price, price, url],
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("save ok");
            }
        );
    });
};

const remove = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`delete from url_data where ?`, { url: url }, function (error, rows, fields) {
            if (error) reject(error);
            resolve("delete ok");
        });
    });
};

const move = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `insert into deleted_url_data (brand, url) select * from url_data where ? on duplicate key update brand = VALUES(brand)`,
            { url: url },
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("save ok");
            }
        );
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from url_data order by url desc", function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const findByUrl = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from url_data where url = '${url}'`, function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

module.exports = {
    save,
    remove,
    findByUrl,
    findAll,
    move,
    updateLowestPrice,
};

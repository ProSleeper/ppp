const { connection } = require("./mysql_connector.js");

/**
 * save(insert&update)
 * find(select where)
 * findAll(select)
 * remove(delete)
 */

const save = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `insert into ${data_obj.constructor.name} set ?`,
            [data_obj.data],
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
        connection.query("select * from sale_data", function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const findByUrl = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from sale_data where url = '${url}'`, function (error, rows, fields) {
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
};

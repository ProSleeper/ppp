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
        connection.query("select * from url_data", function (error, rows, fields) {
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
};

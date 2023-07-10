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

const remove = (url, change_date, sale_price) => {
    return new Promise((resolve, reject) => {
        console.log(url);
        console.log(change_date);
        console.log(sale_price);
        connection.query(
            `delete from sale_data where url='${url}' and change_date='${change_date}' and sale_price = ${sale_price}`,
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("delete ok");
            }
        );
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from sale_data order by change_date desc", function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

module.exports = {
    save,
    remove,
    findAll,
};

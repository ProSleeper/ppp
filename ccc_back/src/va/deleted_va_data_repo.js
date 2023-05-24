const { connection } = require("../repository/mysql_connector.js");
const va_data_dto = require("./va_data_dto.js");

/**
 * save(insert&update)
 * find(select where)
 * findAll(select)
 * remove(delete)
 */

const save = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `insert into deleted_va_data set ?, created = now() on duplicate key update ?, created = now()`,
            [data_obj.data, data_obj.data],
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("save ok");
            }
        );
    });
};

const remove = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`delete from deleted_va_data where url = '${url}'`, function (error, rows, fields) {
            if (error) reject(error);
            resolve("delete ok");
        });
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from deleted_va_data", function (error, rows, fields) {
            if (error) reject(error);
            resolve(convert_to_dto(rows));
        });
    });
};

const convert_to_dto = (rows) => {
    const obj_list = [];
    try {
        rows.forEach((row) => {
            obj_list.push(new va_data_dto(row.title, row.url, row.created).data);
        });
        return obj_list;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    save,
    remove,
    findAll,
};

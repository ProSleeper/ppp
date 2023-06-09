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
            `insert into va_data set ?, created = now() on duplicate key update ?, created = now()`,
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
        connection.query(`delete from va_data where url = '${url}'`, function (error, rows, fields) {
            if (error) reject(error);
            resolve("delete ok");
        });
    });
};

const move = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `insert into deleted_va_data (title, url, created) select title, url, created from va_data where ? on duplicate key update title = VALUES(title), url = VALUES(url), created = VALUES(created)`,
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
        connection.query("select * from va_data order by id desc", function (error, rows, fields) {
            if (error) reject(error);
            resolve(convert_to_dto(rows));
        });
    });
};

const findByUrl = (url) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from va_data where url = '${url}'`, function (error, rows, fields) {
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
    findByUrl,
    findAll,
    move,
};

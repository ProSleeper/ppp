const { connection } = require("./mysql_connector.js");

const save = (data_obj) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `insert into ${data_obj.constructor.name} set ?, created = now()`,
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
        // delete from 테이블명 where 컬럼명 in (컬럼명내용1, 컬럼명내용2);
        connection.query(
            `delete from ${data_obj.constructor.name} where ?`,
            // `delete from ${data_obj.constructor.name} where endpoint in (?)`,
            { cookie: data_obj.data.cookie },
            function (error, rows, fields) {
                if (error) reject(error);
                resolve("delete ok");
            }
        );
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from subscriber_data", function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const findByCookie = (cookie) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from subscriber_data where cookie = '${cookie}'`, function (error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

module.exports = {
    save,
    remove,
    findByCookie,
    findAll,
};

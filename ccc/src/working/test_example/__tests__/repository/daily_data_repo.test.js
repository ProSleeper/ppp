const daily_data = require("../../../entity/daily_data.js");
const { save, remove, findByUrl, findAll } = require("../../../repository/daily_data_repo.js");
const { connection } = require("../../../repository/mysql_connector.js");

test("insert daily_data", () => {
    const obj = new daily_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

test("update daily_data", () => {
    const insert_obj = new daily_data("brand_insert", "title_insert", "http://test.com", "20230518", 13000);
    const update_obj = new daily_data("brand_update", "title_update", "http://test.com", "20230505", 30000);
    connection.beginTransaction();
    save(insert_obj).then((result) => {
        expect(result).toEqual("save ok");
        save(update_obj).then((result) => {
            expect(result).toEqual("save ok");
            findByUrl(update_obj.data.url).then((result) => {
                expect(result).toEqual([]); //여기 값을 판단해야함.
                connection.rollback();
            });
        });
    });
});

test("delete daily_data", () => {
    const obj = new daily_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        remove(obj).then((result) => {
            expect(result).toEqual("delete ok");
            connection.rollback();
        });
    });
});

test("select_one daily_data", () => {
    const obj = new daily_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        findByUrl(obj.data.url).then((result) => {
            expect(result).toEqual([]); //여기 값을 판단해야함.
            connection.rollback();
        });
    });
});

test("select_all daily_data", () => {
    const obj1 = new daily_data("test", "test_proc", "http://test1.com", "20230518", 13000);
    const obj2 = new daily_data("test", "test_proc", "http://test2.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj1).then((result) => {
        expect(result).toEqual("save ok");
        save(obj2).then((result) => {
            expect(result).toEqual("save ok");
            findAll().then((result) => {
                expect(result).not.toBeNull(); //여기 값을 판단해야함.
                connection.rollback();
            });
        });
    });
});

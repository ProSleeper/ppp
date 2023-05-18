const daily_data = require("../../../entity/daily_data.js");
const monthly_data = require("../../../entity/monthly_data.js");
const sale_data = require("../../../entity/sale_data.js");
const url_data = require("../../../entity/url_data.js");
const { save } = require("../../../repository/repository.js");
const { connection } = require("../../../repository/mysql_connector.js");

test("insert daily_data", () => {
    const obj = new daily_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

test("insert monthly_data", () => {
    const obj = new monthly_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

//여기 부분은 구현 후 테스트를 해야함.
test("insert prev_data", () => {
    const obj = new daily_data("test", "test_proc", "http://test.com", "20230518", 13000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

test("insert sale_data", () => {
    const obj = new sale_data("test", "test_proc", "http://test.com", "20230518", 13000, 18000);
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

test("insert url_data", () => {
    const obj = new url_data("test", "http://test.com");
    connection.beginTransaction();
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
        connection.rollback();
    });
});

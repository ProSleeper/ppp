const sale_data = require("../../../entity/sale_data.js");
const { save, remove, findByUrl, findAll } = require("../../../repository/sale_data_repo.js");
require("./repo.test.js");

test("insert sale_data", async () => {
    const obj = new sale_data("test", "test_proc", "http://test3.com", "20230511", 10000, 13000);

    const result = await save(obj);
    expect(result).toEqual("save ok");
});

test("update sale_data", async () => {
    //이 테이블은 pk가 없다. 그래서 그런지 on duplicate key sql로는 update가 안되는 것 같다.
    const insert_obj = new sale_data("brand_insert", "title_insert", "http://test4.com", "20230530", 10000, 13000);
    const update_obj = new sale_data("brand_update", "title_update", "http://test5.com", "20230505", 10000, 30000);

    const result1 = await save(insert_obj);
    expect(result1).toEqual("save ok");

    const result2 = await save(update_obj);
    expect(result2).toEqual("save ok");

    const result3 = await findByUrl(update_obj.data.url);
    expect(result3[0].brand).toEqual("brand_update");
});

test("delete sale_data", async () => {
    const obj = new sale_data("test", "test_proc", "http://test6.com", "20230501", 10000, 13000);

    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await remove(obj);
    expect(result2).toEqual("delete ok");
});

test("select_one sale_data", async () => {
    const obj = new sale_data("test", "test_proc", "http://test7.com", "20230502", 10000, 13000);
    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await findByUrl(obj.data.url);
    expect(result2[0].title).toEqual("test_proc");
});

test("select_all sale_data", async () => {
    const before_select_count = (await findAll()).length;

    const obj1 = new sale_data("test", "test_proc", "http://test9.com", "20230511", 10000, 13000);
    const obj2 = new sale_data("test", "test_proc", "http://test8.com", "20230501", 10000, 13000);

    const result1 = await save(obj1);
    expect(result1).toEqual("save ok");

    const result2 = await save(obj2);
    expect(result2).toEqual("save ok");

    const result3 = await findAll();
    expect(result3.length).toBe(before_select_count + 2); //여기 값을 판단해야함.
});

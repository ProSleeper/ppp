const prev_daily_data = require("../../../entity/prev_daily_data.js");
const { save, remove, findByUrl, findAll } = require("../../../repository/prev_daily_data_repo.js");
require("./repo.test.js");

test("insert prev_daily_data", async () => {
    const obj = new prev_daily_data("test", "test_proc", "http://test3.com", "20230511", 13000);

    const result = await save(obj);
    expect(result).toEqual("save ok");
});

test("update prev_daily_data", async () => {
    const insert_obj = new prev_daily_data("brand_insert", "title_insert", "http://test4.com", "20230530", 13000);
    const update_obj = new prev_daily_data("brand_update", "title_update", "http://test4.com", "20230505", 30000);

    const result1 = await save(insert_obj);
    expect(result1).toEqual("save ok");

    const result2 = await save(update_obj);
    expect(result2).toEqual("save ok");

    const result3 = await findByUrl(update_obj.data.url);
    expect(result3[0].brand).toEqual("brand_update");
});

test("delete prev_daily_data", async () => {
    const obj = new prev_daily_data("test", "test_proc", "http://test6.com", "20230501", 13000);

    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await remove(obj);
    expect(result2).toEqual("delete ok");
});

test("select_one prev_daily_data", async () => {
    const obj = new prev_daily_data("test", "test_proc", "http://test7.com", "20230502", 13000);
    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await findByUrl(obj.data.url);
    expect(result2[0].title).toEqual("test_proc");
});

test("select_all prev_daily_data", async () => {
    const before_select_count = (await findAll()).length;

    const obj1 = new prev_daily_data("test", "test_proc", "http://test9.com", "20230511", 13000);
    const obj2 = new prev_daily_data("test", "test_proc", "http://test8.com", "20230501", 13000);

    const result1 = await save(obj1);
    expect(result1).toEqual("save ok");

    const result2 = await save(obj2);
    expect(result2).toEqual("save ok");
 
    const result3 = await findAll();
    expect(result3.length).toBe(before_select_count + 2); //여기 값을판단해야함.
});

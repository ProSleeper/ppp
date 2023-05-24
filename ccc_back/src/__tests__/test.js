const url_data = require("../../../entity/url_data.js");
const { save, remove, findByUrl, findAll } = require("../../../repository/deleted_url_data_repo.js");
require("./repo.test.js");

test("insert url_data", async () => {
    const obj = new url_data("test", "http://test3.com");

    const result = await save(obj);
    expect(result).toEqual("save ok");
});

test("update url_data", async () => {
    const insert_obj = new url_data("brand_insert", "http://test4.com");
    const update_obj = new url_data("brand_update", "http://test4.com");

    const result1 = await save(insert_obj);
    expect(result1).toEqual("save ok");

    const result2 = await save(update_obj);
    expect(result2).toEqual("save ok");

    const result3 = await findByUrl(update_obj.data.url);
    expect(result3[0].brand).toEqual("brand_update");
});

test("delete url_data", async () => {
    const obj = new url_data("test", "http://test6.com");

    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await remove(obj);
    expect(result2).toEqual("delete ok");
});

test("select_one url_data", async () => {
    const obj = new url_data("freechal", "http://test7.com");
    const result1 = await save(obj);
    expect(result1).toEqual("save ok");

    const result2 = await findByUrl(obj.data.url);
    expect(result2[0].brand).toEqual("freechal");
});

test("select_all url_data", async () => {
    const before_select_count = (await findAll()).length;

    const obj1 = new url_data("test", "http://test9.com");
    const obj2 = new url_data("test", "http://test8.com");

    const result1 = await save(obj1);
    expect(result1).toEqual("save ok");

    const result2 = await save(obj2);
    expect(result2).toEqual("save ok");

    const result3 = await findAll();
    expect(result3.length).toBe(before_select_count + 2); //여기 값을 판단해야함.
});

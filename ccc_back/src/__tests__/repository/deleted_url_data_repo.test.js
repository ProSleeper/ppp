const { save, remove, findByUrl, findAll } = require("../../../src/repository/deleted_url_data_repo.js");
require("./repo.test.js");

test("get one url_data", async () => {
    // const obj = new url_data("test", "http://test3.com");
    const obj = "https://www.musinsa.com/app/goods/3296330?loc=goods_rank";
    const result = await findByUrl(obj);
    expect(result).toEqual([{ brand: "musinsa", url: obj }]);
});

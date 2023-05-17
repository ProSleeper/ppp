const daily_data = require("../../entity/daily_data.js");
const { save } = require("../../repo/repository.js");

test("insert daily_data", () => {
    const obj = new daily_data("a1", "b2", "http://musinsa.com", "20230517", 111);
    save(obj).then((result) => {
        expect(result).toEqual("save ok");
    });
});

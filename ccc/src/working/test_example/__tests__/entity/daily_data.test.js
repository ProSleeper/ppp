const daily_data = require("../../../entity/daily_data.js");
const { HH } = require("../../../../util/date_helper.js");

test("class daily_data create", () => {
    const obj = new daily_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("daily_data");
    expect(obj.data.today).toBe("20230517");
    expect(obj.data[`time${HH()}_price`]).toBe(111);
});

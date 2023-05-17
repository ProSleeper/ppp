const monthly_data = require("../../../entity/monthly_data.js");
const { Parse_Day } = require("../../../../util/date_helper.js");

test("class monthly_data create", () => {
    const obj = new monthly_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("monthly_data");
    expect(obj.data.month).toBe("20230517");
    expect(obj.data[`day${Parse_Day("20230517")}_price`]).toBe(111);
});

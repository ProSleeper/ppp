const daily_data = require("../../../entity/daily_data.js");
const monthly_data = require("../../../entity/monthly_data.js");
const { HH, Parse_Day } = require("../../../../util/date_helper.js");

test("daily_data", () => {
    const obj = new daily_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("daily_data");
    expect(obj.data.today).toBe("20230517");
    expect(obj.data[`time${HH()}_price`]).toBe(111);
});

test("monthly_data", () => {
    const obj = new monthly_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("monthly_data");
    expect(obj.data.month).toBe("20230517");
    expect(obj.data[`day${Parse_Day("20230517")}_price`]).toBe(111);
});

//이 아래로 아직 작성 못함.

test("prev_daily_data", () => {
    const obj = new monthly_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("monthly_data");
    expect(obj.data.month).toBe("20230517");
    expect(obj.data[`day${Parse_Day("20230517")}_price`]).toBe(111);
});

test("sale_data", () => {
    const obj = new monthly_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("monthly_data");
    expect(obj.data.month).toBe("20230517");
    expect(obj.data[`day${Parse_Day("20230517")}_price`]).toBe(111);
});

test("url_data", () => {
    const obj = new monthly_data("a1", "b2", "c2", "20230517", 111);
    expect(obj.data.brand).toBe("a1");
    expect(obj.constructor.name).toBe("monthly_data");
    expect(obj.data.month).toBe("20230517");
    expect(obj.data[`day${Parse_Day("20230517")}_price`]).toBe(111);
});

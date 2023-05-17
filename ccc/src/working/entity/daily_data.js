const { HH } = require("../../util/date_helper.js");

class daily_data {
    constructor(brand, title, url, today, price) {
        this.data = {
            "brand": brand,
            title: title,
            url: url,
            today: today,
        };
        this.data[`time${HH()}_price`] = price;
        this.data["primary_key"] = "url";
    }
}

module.exports = daily_data;

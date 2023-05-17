const { HH } = require("../../util/date_helper.js");

class prev_daily_data {
    constructor(brand, title, url, today, price) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            today: today,
            //all time var add!
        };
        this.data[`time${HH()}_price`] = price;
        this.data[`primary_key`] = this.data.url;
    }
}

module.exports = prev_daily_data;

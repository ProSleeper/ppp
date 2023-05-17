const { Parse_Day } = require("../../util/date_helper.js");

class monthly_data {
    constructor(brand, title, url, today, price) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            month: today,
        };
        this.data[`day${Parse_Day(today)}_price`] = price;
        this.data[`primary_key`] = this.data.url;
    }
}

module.exports = monthly_data;

const { Parse_Day } = require("../common/date_helper.js");

class monthly_data {
    constructor(brand, title, url, today, price) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            month: today,
        };
        for (let index = 1; index <= 31; index++) {
            this.data[`day${index}_price`] = null;
        }
        this.data[`day${Parse_Day(today)}_price`] = price;
        this.data[`primary_key`] = this.data.url;
    }
}

module.exports = monthly_data;

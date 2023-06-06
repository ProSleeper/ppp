const { HH } = require("../common/date_helper.js");

//여기서 생성할때 dto를 받아서 생성하는 부분을 만드는 것도 나쁘지 않아 보이는데...
class daily_data {
    constructor(brand, title, url, today, price) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            today: today,
        };
        for (let index = 0; index < 23; index++) {
            this.data[`time${index}_price`] = null;
        }

        this.data[`time${HH()}_price`] = price;
        this.data["primary_key"] = "url";
    }
}

module.exports = daily_data;

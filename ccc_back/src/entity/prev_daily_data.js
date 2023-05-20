class prev_daily_data {
    constructor(prev_data) {
        this.data = {
            brand: prev_data.brand,
            title: prev_data.title,
            url: prev_data.url,
            today: prev_data.today,

            //all time var add!
        };
        for (let index = 0; index < 23; index++) {
            this.data[`time${index}_price`] = prev_data[`time${index}_price`];
        }
        this.data[`primary_key`] = this.data.url;
    }
}

module.exports = prev_daily_data;

class url_data {
    constructor(brand, url) {
        this.data = {
            brand: brand,
            url: url,
            lowest_price: 0,
            highest_price: 0,
        };
        this.data[`primary_key`] = this.data.url;
    }
    update_lowest_price(price) {
        this.data.lowest_price = price;
    }
}

module.exports = url_data;

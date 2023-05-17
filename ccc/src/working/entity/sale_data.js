class sale_data {
    constructor(brand, title, url, change_date, sale_price, prev_price) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            change_date: change_date,
            sale_price: sale_price,
            prev_price: prev_price,
        };
    }
}

module.exports = sale_data;

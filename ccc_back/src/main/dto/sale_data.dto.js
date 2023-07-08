class sale_data_dto {
    constructor({ brand, title, url, change_date, sale_price, prev_price }, lowest_price = 0, highest_price = 0) {
        this.data = {
            brand: brand,
            title: title,
            url: url,
            change_date: change_date,
            sale_price: sale_price,
            prev_price: prev_price,
            lowest_price: lowest_price,
            highest_price: highest_price,
        };
    }
}

module.exports = sale_data_dto;

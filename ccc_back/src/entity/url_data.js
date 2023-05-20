class url_data {
    constructor(brand, url) {
        this.data = {
            brand: brand,
            url: url,
        };
        this.data[`primary_key`] = this.data.url;
    }
}

module.exports = url_data;

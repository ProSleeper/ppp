const sale_data_repo = require("../repository/sale_data_repo.js");

const get_total_sale_data = async () => {
    return await sale_data_repo.findAll();
};

const remove_sale_data = async (url, change_date, sale_price) => {
    return await sale_data_repo.remove(url, change_date, sale_price);
};

module.exports = {
    get_total_sale_data,
    remove_sale_data,
};

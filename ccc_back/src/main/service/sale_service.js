const sale_data_repo = require("../repository/sale_data_repo.js");

const get_total_sale_data = async () => {
    return await sale_data_repo.findAll();
};

const remove_sale_data = async (url) => {
    return await sale_data_repo.remove(url);
};

module.exports = {
    get_total_sale_data,
    remove_sale_data,
};

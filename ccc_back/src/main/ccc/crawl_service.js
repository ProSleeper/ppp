const dateUtil = require("../common/date_helper.js");
const daily_data = require("../entity/daily_data.js");
const daily_data_repo = require("../repository/daily_data_repo.js");
const monthly_data = require("../entity/monthly_data.js");
const monthly_data_repo = require("../repository/monthly_data_repo.js");
const url_data = require("../entity/url_data.js");
const url_data_repo = require("../repository/url_data_repo.js");
const prev_daily_data = require("../entity/prev_daily_data.js");
const prev_daily_data_repo = require("../repository/prev_daily_data_repo.js");
const sale_data = require("../entity/sale_data.js");
const sale_data_repo = require("../repository/sale_data_repo.js");

const StoreProductData = async (data_list) => {
    data_list.forEach((element) => {
        insert_product_data({ ...element });
    });

    const curr_time = dateUtil.HH();
    if (curr_time === 0) {
        const data_list = await daily_data_repo.findByMinPrice();
        StoreMinPriceDataForDay(data_list);
        // console.log(data_list);
    }

    if (curr_time > 0) {
        const result = await daily_data_repo.findBySale(curr_time);
        // console.log(result);
        result.forEach(async (data) => {
            const obj = new sale_data(data);
            const result = await sale_data_repo.save(obj);
            // console.log(result);
        });
    }
};

const StoreMinPriceDataForDay = (data_list) => {
    data_list.forEach((element) => {
        insert_monthly_data({ ...element });
    });
    insert_prev_data();
    delete_old_daily_data();
};

const insert_product_data = async ({ brand, title, url, price }) => {
    const curr_yyyymmdd = dateUtil.YYYYMMDD();
    const obj = new daily_data(brand, title, url, curr_yyyymmdd, price);

    const result = await daily_data_repo.save(obj);
    // console.log(result);
};

const insert_monthly_data = async ({ brand, title, url, today, price }) => {
    const obj = new monthly_data(brand, title, url, today, price);
    const result = await monthly_data_repo.save(obj);
    // console.log(result);
};

const insert_prev_data = async () => {
    const data_list = await daily_data_repo.findByYesterday();
    data_list.forEach(async (element) => {
        const obj = new prev_daily_data(element);
        const result = await prev_daily_data_repo.save(obj);
        // console.log(result);
    });
};

// 데이터 삭제
const delete_old_daily_data = async () => {
    const result = await daily_data_repo.remove_old_data();
    // console.log(result);
};

const read_url = async () => {
    try {
        return await url_data_repo.findAll();
    } catch (error) {
        // console.error(error);
    }
};

module.exports = {
    StoreProductData,
    read_url,
};

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
    for (const element of data_list) {
        await insert_product_data({ ...element });
    }

    //일자가 바뀌면, 즉 0시가 되면 바뀌는 부분도 체크해야하는데 현재 그 부분이 없다.
    //추후에 curr_time >= 0 으로 해서 현재 0시이면 어제 날짜나 monthly_data와 비교하는 부분을 만들면 될거 같다.

    const insert_sale_data = async (sale_list) => {
        for (const data of sale_list) {
            const obj = new sale_data(data);
            const result = await sale_data_repo.save(obj);
        }
    };

    const curr_time = dateUtil.HH();
    if (curr_time >= 0) {
        let sale_list = undefined;
        if (curr_time === 0) {
            sale_list = await daily_data_repo.findByYesterdayPriceCompareTodayPrice(curr_time);
            await insert_sale_data(sale_list);
            const min_price_data_list = await daily_data_repo.findByMinPrice();
            await StoreMinPriceDataForDay(min_price_data_list);
        } else {
            sale_list = await daily_data_repo.findBySale(curr_time);
            await insert_sale_data(sale_list);
        }
        if (sale_list && sale_list.length > 0) {
            return sale_list;
        }
    }
};

const StoreMinPriceDataForDay = async (data_list) => {
    for (const element of data_list) {
        await insert_monthly_data({ ...element });
    }
    await insert_prev_data();
    await delete_old_daily_data();
};

const insert_product_data = async ({ brand, title, url, price }) => {
    const curr_yyyymmdd = dateUtil.YYYYMMDD();
    const obj = new daily_data(brand, title, url, curr_yyyymmdd, price);

    const result = await daily_data_repo.save(obj);
};

const insert_monthly_data = async ({ brand, title, url, today, price }) => {
    const obj = new monthly_data(brand, title, url, today, price);
    const result = await monthly_data_repo.save(obj);
    // console.log(result);
};

const insert_prev_data = async () => {
    const data_list = await daily_data_repo.findByYesterday();

    for (const element of data_list) {
        const obj = new prev_daily_data(element);
        const result = await prev_daily_data_repo.save(obj);
    }
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
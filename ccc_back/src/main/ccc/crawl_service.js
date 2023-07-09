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
const sale_data_dto = require("../dto/sale_data.dto.js");
const sale_data_repo = require("../repository/sale_data_repo.js");

const StoreProductData = async (data_list) => {
    for (const element of data_list) {
        await insert_product_data({ ...element });
    }

    //일자가 바뀌면, 즉 0시가 되면 바뀌는 부분도 체크해야하는데 현재 그 부분이 없다.
    //추후에 curr_time >= 0 으로 해서 현재 0시이면 어제 날짜나 monthly_data와 비교하는 부분을 만들면 될거 같다.

    const insert_sale_data = async (sale_list) => {
        let sale_dto_list = [];
        for (const data of sale_list) {
            const obj = new sale_data(data);
            const result = await sale_data_repo.save(obj);
            const [same_url_data] = await url_data_repo.findByUrl(obj.data.url);
            console.log(obj.data.sale_price);
            console.log(same_url_data.lowest_price);
            if (obj.data.sale_price < same_url_data.lowest_price || same_url_data.lowest_price == 0) {
                await url_data_repo.updateLowestPrice(obj.data.url, obj.data.sale_price);
                const sale_dto = new sale_data_dto(obj.data, obj.data.sale_price);
                sale_dto_list.push(sale_dto);
            }
            //이 부분에 현재 할인가격과 최저가를 비교해서 현재 할인가격이 최저가보다 낮으면 최저가 업데이트.
        }
        return sale_dto_list;
    };

    const curr_time = dateUtil.HH();
    if (curr_time >= 0) {
        let sale_list = undefined;
        if (curr_time === 0) {
            //sale_data 테이블도 최저,최고가 컬럼을 만들고 findByYesterdayPriceCompareTodayPrice 쿼리와 findBySale 쿼리를 실행할때 url_data의 최저가와 비교를해서 해당 값을 채워넣는 방식으로 하자.
            sale_list = await daily_data_repo.findByYesterdayPriceCompareTodayPrice(curr_time);
            const min_price_data_list = await daily_data_repo.findByMinPrice();
            await StoreMinPriceDataForDay(min_price_data_list);
        } else {
            sale_list = await daily_data_repo.findBySale(curr_time);
        }
        const sale_dto_list = await insert_sale_data(sale_list);
        if (sale_dto_list && sale_dto_list.length > 0) {
            return sale_dto_list;
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

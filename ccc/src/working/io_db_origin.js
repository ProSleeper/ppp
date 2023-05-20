const {
    query_exec,
    read_total_url,
    compare_price,
    insert_sale_data,
    insert_monthly_data,
    insert_prev_data,
    new_day_get_old_data,
    delete_data,
} = require("./mysql.js");
const dateUtil = require("../util/date_helper.js");
const request = require("request");

const behavior = {
    insert: "INSERT",
    update: "UPDATE",
    delete: "DELETE",
    select: "SELECT",
};
Object.freeze(behavior);

const data = (behavior, brand, title, url, price) => {
    return {
        behavior: behavior,
        data: {
            brand: brand,
            title: title,
            url: url,
            price: price,
            curr_time: dateUtil.HH(dateUtil.KST()),
        },
    };
};

const WriteToDailyDB = (data_list) => {
    data_list.forEach((element) => {
        insert_product_data({ ...element });
    });
};

const WriteToMonthlyDB = (data_list) => {
    data_list.forEach((element) => {
        insert_monthly_data({ ...element });
        insert_prev_data();
        delete_data(element.url);
    });
};

const insert_product_data = async ({ brand, title, url, price }) => {
    const request_data = data(behavior.insert, brand, title, url, price);
    const curr_time = request_data.data.curr_time;
    await query_exec(request_data).then((result) => {
        //두 값을 비교해서 다시 db에 입력.
        if (result !== null) {
            console.log("ttt" + result);
        }
    });

    if (curr_time === 0) {
        const data_list = await new_day_get_old_data();
        WriteToMonthlyDB(data_list);
        console.log(data_list);
    }

    if (curr_time > 0) {
        const num = await compare_price(url, curr_time);
        const prev_price = num.result;
        if (prev_price > 0) {
            insert_sale_data(brand, title, url, price, prev_price);
        }
    }
};

const select_product_data = async (brand = "", url = "") => {
    const request_data = data(behavior.select, brand, url);

    const result = await query_exec(request_data);
    if (result !== null) {
        return result;
    }
};

const ReadUrl = async () => {
    return await read_total_url();
};

module.exports = {
    WriteToDailyDB,
    ReadUrl,
    insert_product_data,
    select_product_data,
};

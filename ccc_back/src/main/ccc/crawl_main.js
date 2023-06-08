const fs = require("fs");
const path = require("path");
const { StoreProductData, read_url } = require("./crawl_service.js");
const { push_alarm } = require("./push_alarm.js");
const subs_service = require("../service/subs_service.js");
const { fetchHtml, extractData } = require("../common/utils.js");
const { connection } = require("../repository/mysql_connector.js");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../config/CCC.json"), "utf8"));
const parse_brand_selector = config.parse_brand_selector;

const main = async () => {
    // module.exports = async () => {
    const total_url = await read_url();
    const data_list = await Promise.all(
        total_url.map((data) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const html = await fetchHtml(data.url);
                    const product_info_data = {
                        // 이 부분이 dto가 되어야할듯.
                        url: data.url,
                        brand: data.brand,
                    };
                    //아래 extractData를 했을 때 주소가 잘못됐거나 페이지가 없어지는 경우 brand, title, price 등 데이터를 가지고 오지 못한다.
                    //이때 extractData의 반환값은 객체라서 당장은 에러가 없지만 이 값을 사용하는 부분에서 에러가 발생한다.
                    //그러므로 extractData의 값을 받아서 brand, title, price등을 체크해서 없거나 문제가 있으면 reject부분으로 보내서 배열에 안넣어지도록 코드 변경이 필요한것 같다. 추후 수정하자.
                    resolve(extractData(html, product_info_data, parse_brand_selector[product_info_data.brand]));
                } catch (error) {
                    reject(error);
                }
            });
        })
    );

    const product_sale_list = await StoreProductData(data_list);
    if (product_sale_list) {
        const total_subscriber_list = await subs_service.get_total_subscriber();
        //push_alarm sale_list
        const wrong_subs_obj = await push_alarm(product_sale_list, total_subscriber_list);
        if (wrong_subs_obj.length > 0) {
            await subs_service.remove_subscriber_by_endpoint(wrong_subs_obj);
        }
        console.log("crawl_main");
        console.log(product_sale_list);
    } else {
        console.log("not sale");
        /*
        const total_subscriber_list = await subs_service.get_total_subscriber();
        //push_alarm sale_list
        const wrong_subs_obj = await push_alarm(product_sale_list, total_subscriber_list);
        if (wrong_subs_obj.length > 0) {
            await subs_service.remove_subscriber_by_endpoint(wrong_subs_obj);
        }
        */
    }
    connection.end();
};

main();



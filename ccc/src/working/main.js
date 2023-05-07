const fs = require("fs");
const path = require("path");
const { writeToDaily } = require("./scrap_m&u.js");
const { fetchHtml, extractData, readJsonData, parse_brand } = require("../util/common_utils.js");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/CCC.json"), "utf8"));
const urls = JSON.parse(fs.readFileSync(path.join(__dirname, config.path.urls), "utf8"));
const parse_brand_selector = config.parse_brand_selector;

const brands = Object.entries(parse_brand_selector).map(([key]) => {
    return key;
});

//함수 2개는 동일함.
//하나는 Promise then
//하나는 async await

// const main = () => {
//     const total_url = readJsonData(urls);
//     Promise.all(
//         total_url.map((url) => {
//             return new Promise(async (resolve, reject) => {
//                 try {
//                     const html = await fetchHtml(url);
//                     const other_data = {
//                         url: url,
//                         parse_brand: parse_brand(brands, url),
//                     };
//                     resolve(extractData(html, other_data, parse_brand_selector[other_data.parse_brand]));
//                 } catch (error) {
//                     console.error("Error:", error);
//                 }
//             });
//         })
//     ).then((data_list) => {
//         writeToDaily(data_list);
//     });
// };

const main = async () => {
    const total_url = readJsonData(urls);
    const data_list = await Promise.all(
        total_url.map((url) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const html = await fetchHtml(url);
                    const other_data = {
                        url: url,
                        parse_brand: parse_brand(brands, url),
                    };
                    //아래 extractData를 했을 때 주소가 잘못됐거나 페이지가 없어지는 경우 brand, title, price 등 데이터를 가지고 오지 못한다.
                    //이때 extractData의 반환값은 객체라서 당장은 에러가 없지만 이 값을 사용하는 부분에서 에러가 발생한다.
                    //그러므로 extractData의 값을 받아서 brand, title, price등을 체크해서 없거나 문제가 있으면 reject부분으로 보내서 배열에 안넣어지도록 코드 변경이 필요한것 같다. 추후 수정하자.
                    resolve(extractData(html, other_data, parse_brand_selector[other_data.parse_brand]));
                } catch (error) {
                    console.error("Error:", error);
                }
            });
        })
    );

    writeToDaily(data_list);
};

main();

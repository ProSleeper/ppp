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

//�Լ� 2���� ������.
//�ϳ��� Promise then
//�ϳ��� async await

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
                    //�Ʒ� extractData�� ���� �� �ּҰ� �߸��ưų� �������� �������� ��� brand, title, price �� �����͸� ������ ���� ���Ѵ�.
                    //�̶� extractData�� ��ȯ���� ��ü�� ������ ������ ������ �� ���� ����ϴ� �κп��� ������ �߻��Ѵ�.
                    //�׷��Ƿ� extractData�� ���� �޾Ƽ� brand, title, price���� üũ�ؼ� ���ų� ������ ������ reject�κ����� ������ �迭�� �ȳ־������� �ڵ� ������ �ʿ��Ѱ� ����. ���� ��������.
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
